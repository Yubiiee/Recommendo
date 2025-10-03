import os
import pandas as pd
from django.http import JsonResponse
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')

# Function to preprocess text 
def preprocess_text(text):
    stop_words = set(stopwords.words('english'))
    words = text.lower().split()
    return ' '.join([word for word in words if word not in stop_words])

# Function to get book recommendations 
def get_recommendations(book_title, genre, num_recommendations=4):
    file_path = os.path.join(DATA_DIR, f"{genre}_books_cleaned.csv")
    

    df = pd.read_csv(file_path)

    book_title=book_title.lower()

    df['Title_Lower'] = df['Title'].str.lower()

    if book_title not in df['Title_Lower'].values:
        file_path = os.path.join(DATA_DIR, 'Books_books_cleaned.csv')

        dff = pd.read_csv(file_path)

        dff['Combined_Text'] = dff['Title'] + ' ' + dff['Author'] + ' ' + dff['Category'] + ' ' + dff['Description']
        dff['Processed_Text'] = dff['Combined_Text'].apply(preprocess_text)
        
        # Initialize TF-IDF Vectorizer and compute cosine similarity
        tfidf_vectorizer = TfidfVectorizer()
        tfidf_matrix = tfidf_vectorizer.fit_transform(dff['Processed_Text'])
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        entered_title_vec = tfidf_vectorizer.transform([book_title.lower()+" "+genre])
        similarity_scores = cosine_similarity(entered_title_vec, tfidf_matrix).flatten()
        
        # Get the most similar books based on cosine similarity
        sim_scores = list(enumerate(similarity_scores))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[:num_recommendations]

        book_indices = [i[0] for i in sim_scores]
        recommended_books = dff.iloc[book_indices][['Title', 'Author', 'Description', 'Thumbnail']].to_dict('records')

        return recommended_books

    df['Combined_Text'] = df['Title'] + ' ' + df['Author'] + ' ' + df['Category'] + ' ' + df['Description']
    df['Processed_Text'] = df['Combined_Text'].apply(preprocess_text)

    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(df['Processed_Text'])
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    book_index = df[df['Title_Lower'] == book_title].index[0]
    sim_scores = list(enumerate(cosine_sim[book_index]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:num_recommendations + 1]

    book_indices = [i[0] for i in sim_scores]
    recommended_books = df.iloc[book_indices][['Title', 'Author', 'Description', 'Thumbnail']].to_dict('records')

    return recommended_books

