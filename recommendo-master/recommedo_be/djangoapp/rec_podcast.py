import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.stem.porter import PorterStemmer
from fuzzywuzzy import process
import os



BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
file_path = os.path.join(DATA_DIR, "podcasts.csv")

podcasts = pd.read_csv(file_path)  

# Preprocessing
ps = PorterStemmer()

# Function to preprocess and combine relevant text data into a single 'tags' column
def preprocess_tags(row):
    combined = f"{row['Description']} {row['Genre']} {row['Host(s)']}"
    combined = " ".join(ps.stem(word.lower()) for word in combined.split())
    return combined

podcasts['tags'] = podcasts.apply(preprocess_tags, axis=1)

# Create feature vectors using CountVectorizer
cv = CountVectorizer(max_features=5000, stop_words='english')
vectors = cv.fit_transform(podcasts['tags']).toarray()

# Calculate cosine similarity
similarity = cosine_similarity(vectors)

# Recommendation function
def get_podcasts(podcast_name):
    podcast_name = podcast_name.strip().lower()

    # Use fuzzy matching to find the closest match in the dataset
    closest_match = process.extractOne(podcast_name, podcasts['Title'].str.lower())

    if not closest_match or closest_match[1] < 80:  # Adjust threshold for fuzzy matching
        print(f"Podcast '{podcast_name}' not found in the dataset. Please try another title.")
        return

    podcast_index = podcasts[podcasts['Title'].str.lower() == closest_match[0]].index[0]
    distances = similarity[podcast_index]
    recs = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:6]
    
    indices = [i[0] for i in recs]

    print(f"\nPodcasts similar to '{podcast_name}':")
    
    results=podcasts.iloc[indices][['Title','Host(s)','Description','Thumbnail URL','Platforms URL']].to_dict('records')
    return results



# print(recommend("Crime Junkie"))