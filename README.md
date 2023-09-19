# curly-disco
This repository basically focus on the project to process various kinds of musical intervals using front-end, back-end, AI, machine learning, and neuroevolution.

# step 1
Download all dependency files required to implement the project:
## (1) the sample of react app: 
    npx-create-react-app music-quiz --template typescript
    cd ./music-quiz
## (2) delete every file except App.tsx and index.tsx
## (3) the stylistic formats to visualize the project
    npm i styled-components @types/styled-components
    npm start ----> localhost:4006
## (4) the background image for the game
    images/music-bg.jpg
## (5) Catamaran
    https://fonts.google.com/specimen/Catamaran
## (6) Trivia API
    https://opentdb.com/api_config.php




# step 2
Start the logic of our implementation so that our code is able to function properly.
## (1) 1. create a file QuestionCard.tsx so that each functionality
##        associated with the question card is able to operate efficiently.
            QuestionCard.tsx ------> the tool used for recording questions

            Code sample:
            import react from 'React';
            const QuestionCard = () => {
                return <div>Quiz Card</div>
            }
            export default QuestionCard;


## (2) 1. create two typescript files API.ts and utils.ts, where 
##        API.ts is mainly for the logic by fetching data from API
##        and utils.ts for questions that are kept randomized.
            API.ts  utils.ts  

## (3) 1. think of the implementation of the main function 
##        so that the user is able to complete the quiz fluently. 
            App.tsx
            // the framework we want to focus on
            import react from 'React';
            const APP = () => {
                return <div class='APP'>Quiz Game</div>;
            }
            export default APP;

##      2. consider how the const program APP is functioned
##         
##         const startTrivial = async() => {

##         } 
##         The reason why asyc() is added to the function startTrivial()
##         is going to make the API call.

##         const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

##         }

##         const NextQuestion = () => {

##         }

##         ** The return function must encompass a pair of parenthesis because 
##            the const function APP() above is the one with an array.**
                import react from 'React'; 
                const APP = () => {
                    // The first action the user taks depicts the 
                    // scenario at which the user starts the game. 
                    const startTrivial = async() => {

                    }

                    // The second action mainly focus on the user 
                    // clicking the answer he/she selects
                    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

                    }
                    
                    // The third and last action the user needs to concentrate on
                    // is the next question that should be completed. 
                    const nextQuestion = () => {

                    }
                    return (<div class='APP'>
                             Quiz Game
                             </div>);
                }
                export default APP; 
##      3. modify and edit the html portion of the main class APP
##         to format the structure of the website properly for visualization
                import react from 'React';
                import QuestionCard from './components/QuestionCard.tsx';
                const APP = () => {
                    // The first action the user taks depicts the 
                    // scenario at which the user starts the game. 
                    const startTrivial = async() => {

                    }

                    // The second action mainly focus on the user 
                    // clicking the answer he/she selects
                    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

                    }
                    
                    // The third and last action the user needs to concentrate on
                    // is the next question that should be completed. 
                    const nextQuestion = () => {

                    }
                    return (<div class='APP'>
                                <h1> Music Quiz</h1>
                                <button className='start' onClick={startTrivial}>
                                   Start
                                </button>
                                <p className='score'>Score:</p>
                                <p>Loading Questions...</p>
                                <QuestionCard />
                                <button className='next' onClick={nextQuestion}>
                                   Next
                                </button>
                             </div>);
                }
                export default APP;                  
