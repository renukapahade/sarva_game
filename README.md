# Project description

A simple game built using Express and Soket.io .
The game server/client are implemented using the express framework, the server-client communication is achieved with socket.io.


## How it works

When a new client communication is made, the rules of the game are displayed with a timer of 5 seconds.
Once the game starts, a key is displayed on the screen, which the user needs to press within a timeout of 5 seconds.
Every time the user presses a key/or after the timeout of 5 seconds, user response and the actual key is sent to the server to evaluate the score and lives left.

Game Rules:
> **+1**  correct match

> **-1**  incorrect match

> **0**   no entry (miss)

> **game over**   after 3 consecutive misses


## Installation

```
cd sarva_game 
#Go to project directory

npm install 
#To install the dependencies
```


## Run server

```
cd chatbot/server
#Go to project directory 

npm start
# 5000 port for server/Express
```

## By default

```
server reponses: Terminal console
client: http://localhost:5000
```

## Directory structure

```
/sarva_game/server.js                - Express server code
/sarva_game/public/                  - Client pages
/sarva_game/public/main.js/          - Main JS file (client), change the UI on user actions
/sarva_game/public/index.html        - Main HTML file (client)
/sarva_game/public/styles.css        - Custom CSS styling file

```

