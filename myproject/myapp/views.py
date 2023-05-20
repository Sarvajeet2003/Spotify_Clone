from django.shortcuts import render, redirect
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import webbrowser

def play_song(request):
    if request.method == 'POST':
        song_name = request.POST.get('song_name')
        scope = "user-read-playback-state,user-modify-playback-state"
        sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope, client_id='e98bde463dc04b159ac2edcf437130f4', client_secret='767cffb3d51347738f7a191cc3e53cf8', redirect_uri='http://localhost:8080/callback/'))
        devices = sp.devices()
        if not devices['devices']:
            webbrowser.open('https://open.spotify.com/')
        results = sp.search(q=song_name, type='track', limit=1)
        uri = results['tracks']['items'][0]['uri']
        sp.start_playback(uris=[uri])
    return render(request, 'play_song.html')

