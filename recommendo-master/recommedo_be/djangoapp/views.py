
import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from djangoapp.rec_book import get_recommendations
from djangoapp.rec_songs import recommender
from djangoapp.rec_movies import get_movies
from djangoapp.rec_podcast import get_podcasts



def home(request):
    return render(request,'index.html')


def get_book_recommendations(request):
    try:
        book_title = request.GET.get('book_title')
        genre = request.GET.get('genre')

        if not book_title or not genre:
            return JsonResponse({"error": "Missing book title or genre"}, status=400)

        recommendations = get_recommendations(book_title, genre)

        # Ensure recommendations is a valid list or dict
        if isinstance(recommendations, dict) and "error" in recommendations:
            return JsonResponse(recommendations, status=404)

        return JsonResponse(recommendations, safe=False)

    except Exception as e:
        # Log the error and return a proper JSON error
        print(f"Error: {e}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)



@csrf_exempt  # Temporarily bypass CSRF for testing, remove for production
def get_song_recommendations(request):
    try:
        # Get the song name and number of recommendations from the GET request
        song_name = request.GET.get('song_name')
        num_recommendations = request.GET.get('number_songs', 5)  # Default to 5 if not provided

        if not song_name:
            return JsonResponse({"error": "Missing song name"}, status=400)

        # Convert num_recommendations to an integer if it's provided
        try:
            num_recommendations = int(num_recommendations)
        except ValueError:
            return JsonResponse({"error": "Invalid number of recommendations"}, status=400)

        # Get recommendations using the recommender function
        recommendations = recommender.recommend(song_name, 4)

        # If recommendations are empty, return a proper message
        if not recommendations:
            return JsonResponse({"error": "No recommendations found for the song"}, status=404)

        return JsonResponse({"recommendations": recommendations}, safe=False)

    except Exception as e:
        # Log the error and return a proper JSON error
        print(f"Error: {e}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)
    

def get_movie_recommendations(request):
    try:
        # Get the movie name from the request
        movieName = request.GET.get('movie_name')

        # Check if movie name is provided
        if not movieName:
            return JsonResponse({"error": "Missing movie name"}, status=400)
        
        # Fetch recommendations
        recommendations = get_movies(movieName)

        # If recommendations are empty, return a proper message
        if not recommendations:
            return JsonResponse({"error": "No recommendations found for the movie"}, status=404)

        # Return recommendations as JSON
        return JsonResponse({"recommendations": recommendations})
        
    except Exception as e:
        # Log the error and return a proper JSON error response
        print(f"Error: {e}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)
    
    
def get_podcast_recommendations(request):
    try:
        podName=request.GET.get('podcast_name')
        if not podName:
            return JsonResponse({"error": "Missing podcast name"}, status=400)
        
        # Fetch recommendations
        recommendations = get_podcasts(podName)

        # If recommendations are empty, return a proper message
        if not recommendations:
            return JsonResponse({"error": "No recommendations found for the podcast"}, status=404)

        # Return recommendations as JSON
        return JsonResponse({"recommendations": recommendations})

    except Exception as e:
        print(f"Error: {e}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)