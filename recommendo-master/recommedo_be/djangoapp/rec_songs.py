import numpy as np
import pandas as pd
from typing import List, Dict
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
file_path = os.path.join(DATA_DIR, "songdata.csv")

# Load and preprocess song data
songs = pd.read_csv(file_path)
songs = songs.sample(n=5000).drop('link', axis=1).reset_index(drop=True)
songs['text'] = songs['text'].str.replace(r'\n', '')

# TF-IDF Vectorization and Cosine Similarity Calculation
tfidf = TfidfVectorizer(analyzer='word', stop_words='english')
lyrics_matrix = tfidf.fit_transform(songs['text'])
cosine_similarities = cosine_similarity(lyrics_matrix)

# Build a dictionary of song similarities
similarities = {}
for i in range(len(cosine_similarities)):
    similar_indices = cosine_similarities[i].argsort()[:-50:-1]  # Top 50 most similar songs
    similarities[songs['song'].iloc[i]] = [
        (cosine_similarities[i][x], songs['song'][x], songs['artist'][x]) for x in similar_indices][1:]

class ContentBasedRecommender:
    def __init__(self, matrix):
        self.matrix_similar = matrix

    def recommend(self, song_name: str, num_recommendations: int) -> List[Dict[str, str]]:
        # Fetch the song's recommendations
        if song_name not in self.matrix_similar:
            return []

        recommendations = self.matrix_similar[song_name][:num_recommendations]
        # Return formatted recommendations
        return [{'track_name': rec[1], 'artist': rec[2]} for rec in recommendations]

# Create a recommender instance
recommender = ContentBasedRecommender(similarities)
