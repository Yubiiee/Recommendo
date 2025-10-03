from django.test import TestCase
from rec_book import get_recommendations
from rec_movies import get_movies
from rec_podcast import get_podcasts


# Create your tests here.
# print(get_recommendations("a captive prince","popular"))

# print(get_movies("Avengers"))

print(get_podcasts("How I Built This"))