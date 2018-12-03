<h1>React Minesweeper</h1>

<a href="https://reactminesweeper.firebaseapp.com/">Demo</a>

This is an implementation of Minesweeper using ReactJS. It closely resembles Microsoft Minesweeper that was popularized in Windows 3.1.

Like my React Snake project, this project also uses a 2d array which holds values indicating what to render in each individual element of a 2d array of span elements. Rather then rendering simple colors and borders, this project uses freely available SVG images. 

The level is created by randomly generating mine locations and counting the number of adjacent mines for each square. The number of generated mines depends on the difficulty. The mine generating algorithm ensures that all mine locations are unique, i.e. there cannot be multiple mines assigned to the same location, effectively reducing the total number of mines. 

To win the game, the player must place a flag (by right clicking on unopened squares) on all mines. The game keeps track of which mines have been flagged and triggers a victory condition when all mines have been flagged. When a square is clicked on with zero adjacemt mines, all other adjacent squares with zero adjacent mines and neighboring cells that have adjacent mines are revealed using recursion.
