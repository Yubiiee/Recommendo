import pandas as pd
import ast
import os
from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity
from fuzzywuzzy import process



BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')

file1=os.path.join(DATA_DIR,'tmdb_5000_movies.csv')
file2=os.path.join(DATA_DIR,'tmdb_5000_credits.csv')

movies = pd.read_csv(file1)
credits = pd.read_csv(file2)

# Merge datasets on the 'title' column
movies = movies.merge(credits, on="title")

# Select relevant columns
movies = movies[['movie_id', 'title', 'overview', 'genres', 'keywords', 'cast', 'crew','homepage']]
movies.dropna(inplace=True)

# Function to convert stringified JSON to list of names
def convert(obj):
    L = []
    for i in ast.literal_eval(obj):
        L.append(i['name'])
    return L

movies['genres'] = movies['genres'].apply(convert)
movies['keywords'] = movies['keywords'].apply(convert)

# Function to keep only the first 3 cast members
def convert3(obj):
    L = []
    counter = 0
    for i in ast.literal_eval(obj):
        if counter != 3:
            L.append(i['name'])
            counter += 1
        else:
            break
    return L

movies['cast'] = movies['cast'].apply(convert3)

# Function to fetch the director's name
def fetch_director(obj):
    L = []
    for i in ast.literal_eval(obj):
        if i['job'] == 'Director':
            L.append(i['name'])
            break
    return L

movies['crew'] = movies['crew'].apply(fetch_director)
movies['overview'] = movies['overview'].apply(lambda x: x.split())
movies['genres'] = movies['genres'].apply(lambda x: [i.replace(" ", "") for i in x])
movies['keywords'] = movies['keywords'].apply(lambda x: [i.replace(" ", "") for i in x])
movies['cast'] = movies['cast'].apply(lambda x: [i.replace(" ", "") for i in x])
movies['crew'] = movies['crew'].apply(lambda x: [i.replace(" ", "") for i in x])

# Combine all textual data into a 'tags' column
movies['tags'] = movies['overview'] + movies['genres'] + movies['keywords'] + movies['cast'] + movies['crew']
new_df = movies[['movie_id', 'title', 'tags','cast','overview','homepage']]
new_df.loc[:, 'tags'] = new_df['tags'].apply(lambda x: " ".join(x))
new_df.loc[:, 'tags'] = new_df['tags'].apply(lambda x: x.lower())


new_df['overview'] = new_df['overview'].apply(lambda x: ' '.join(x))




ps = PorterStemmer()
new_df.loc[:, 'tags'] = new_df['tags'].apply(lambda x: " ".join(ps.stem(i) for i in x.split()))

cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(new_df['tags']).toarray()
similarity = cosine_similarity(vectors)

# Recommendation function
def get_movies(movie_name):
    movie_name = movie_name.strip().lower()

    # Use fuzzy matching to find the closest match in the dataset
    closest_match = process.extractOne(movie_name, new_df['title'].str.lower())

    if not closest_match or closest_match[1] < 80:  # Adjust the threshold as needed
        print(f"Movie '{movie_name}' not found in the dataset. Please try another title.")
        return

    movie_index = new_df[new_df['title'].str.lower() == closest_match[0]].index[0]
    distances = similarity[movie_index]
    movies_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]

    book_indices = [i[0] for i in movies_list]

   

    # Create the recommendations dictionary
    movies_rec = new_df.iloc[book_indices][['title', 'overview', 'cast', 'homepage']].to_dict('records')

    return movies_rec

# 
# Run the search function
# print(recommend("Spider Man-3"))