# curly-disco
This repository basically focus on the project to process various kinds of musical intervals using front-end, back-end, AI, machine learning, and neuroevolution.

# step 1
Download all dependency files required to implement the project:
## (1) the sample of react app: 
    npx-create-react-app music-quiz --template typescript
    cd ./music-quiz
## (2) the stylistic formats to visualize the project
    npm i styled-components @types/styled-components
    npm start ----> localhost:3000
## (3) the background image for the game
    images/music-bg.jpg
## (4) Catamaran
    https://fonts.google.com/specimen/Catamaran
## (5) Trivia API
    https://opentdb.com/api_config.php


# step 2
Start the logic of our implementation so that our code is able to function properly.
## (1) create QuestionCard.txs so that each functionality
##     associated with the question card is able to be operated ##     efficiently.
       QuestionCard.tsx
## (2) create two typescript files API.ts and utils.ts, where 
##     API.ts is mainly for creating the logic by fetching data ##     from API and utils.ts for keeping the functions to 
##     randomize questions
       API.ts  utils.ts   