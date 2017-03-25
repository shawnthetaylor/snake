Squarespace Interview
=========
Prompt: **Snake**
Date: **March 18, 2017**
Author: **Shawn Taylor**

## Getting Started
```bash
npm i
npm start
```

###### **NOTE**: Your system needs to have `python` installed as `npm start` uses `SimpleHTTPServer` to run a local server.

## Overview

1. [Game.js](#game.js)
2. [Snake.js](#snake.js)
3. [Block.js](#block.js)
4. [Food.js](#food.js)
5. [Issues](#issues)

## Game.js
File declaring all event listeners when DOMContentLoaded.

In a perfect world this would have been the ONLY file touching the DOM (see [Issues](#issues) below). Any additional key bindings would go here and this file would respond to any events that required updates to the DOM.

## Snake.js
Slightly overburdened file handling rendering and game loop logic.

This is regrettably a pretty large file since it contains the 'draw' method which is responsible for rendering the game state at any point in time. If you're trying to find the logic for how something in the game is happening (or isn't happening), it is likely in (or missing from) this file.

## Block.js
Simple class representing a section of the snake.

This one is pretty straightforward. The class simple keeps track of where it is and where it was and some dimensional data. [snake.js](#Snake.js) handles the manipulation of these values.

## Food.js
Simple class representing a food pellet.

## Issues

Sadly, this is an exact replica of the snake game. Here are some issues I have with this solution:

1. I feel like my 'draw' logic got a bit bloated. There was a lot to keep track of in this method and I have no doubt that with more time I could have yanked a lot of this out into either a utility class or separate classes entirely. Testing this method as is would be a nightmare...
2. Styling. As a front-end engineer it KILLED me to not have more time to style this project better. Since the bulk of the work was in the JS logic, I only put in about 10 minutes on my CSS.
3. snake.js has DOM logic in it. This was mainly due to the stress of trying to wrap things up within 3 hours, but it made things a mild nightmare when trying to figure out where code was interacting with the DOM if something went wrong. If I had more time, a "Drawing" class might have been useful for being solely responsible for doing stuff to the DOM during runtime.
4. Probably the most glaring issue is that when the game ends, the game board just goes blank. This is a similar issue to #3 since I wanted to avoid adding any DOM logic to snake.js. So I opted for a really simple solution since I realized refreshing the page took little to no time to reset the game.
5. General app structure. This app would have been awesome to build in React + Redux but since I really didn't want to use any of my time setting all the actions, reducers, and components I decided to go with the structure I have here.
6. The food pellets are randomly placed without caring about landing right on top of the snake's body. In all the games I've "tested" I have yet to see this happen, but it is definitely possible.
7. There is one known bug right now that occurs when the user inputs 2 arrow commands before the `draw` cycle occurs. The first arrow can be in any direction but the second arrow needs to be in the exact opposite direction that the snake is traveling. This occurs because the `dx` and `dy` values get set immediately and not when the `draw` cycle actually executes. This can be fixed by simply waiting to update those values until `draw` executes.
