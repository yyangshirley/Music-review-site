# ece9065-yyan496-project

Introduction
======
This is a music review site where users can submit reviews of musical performances and can create playlists for the songs. Site manager could manage songs and users status.

Function
===
In this project I use Angular for front-end and node.js for the back-end. The database I used is MongoDB Cloud. The functions I realized are:

unauthenticated users:
----
1. register (includes email verification)

2. see the list of top 10 songs

3. search songs based on keywords

4. click a song to get more details about the song

5. view all the reviews for a song

authenticated users:
---
1. login (local authentication, 3rd authentication)
local: login by email and password
3rd: login by google account

2. add a review to a song

3. add a rating for the review
rating: 1-5

4. add songs in the site

5. create playlist of songs

6. searching the songs by keyword

7. edit the title and description for their playlist

8. add/remove songs from their playlists

9. set the visibility for their playlist(private/public)


site mannager:
---
1. login (username: site manager)

2. set the status for the users(deactivated/activated)
deactivated: deactivated users have the same functionality as unauthenticated users
activated: Users could use any functionality in the site.

3. set the visibility for the songs(hidden/open)
hidden: No one could see the song
open: Anyone could see the song

4. set pivilege for special users(normal/site manager)
normal: normal user
site manager: have piviliege to do what the site manager could do
