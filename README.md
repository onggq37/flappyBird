# ga_project1

What is it?
This is a game call flappy bird, the goal of the game is to avoid obstacle and score high points.

Techinical Details
On load, the app will display a start screen. 

Clicking on the screen start the game and the bird will start dropping due to gravity. Clicking on the screen cause the bird to flap and jump.

Collision with the ground or any of the pipes will result in the bird dying and bring us to the game over state.

Explain the technical challenges
Rotaing the bird - Instead of rotating the bird, I had to save the canvas, rotate canvas, print the rotated bird and restore the canvas original position.

animating the bird - Implement frames into the game to get the period so that i know when to change the bird between pictures

score - I was having difficulty trying to save the best score, and later found out that i could use localStorage

Collision - my logic for collision was not working initially, spend quite some time debugging

Improvement
add restart button
add pause button
add keydown button
