
function home() { // Sends the user back to the homepage when they click the logo

    window.open("Homepage.html", "_self"); // The SDG 9 webpage is opened in the same tab by passing "_self" in the open() function

}

// -----------------------------

function search() { // Takes input from the search bar to direct the user

if (document.getElementById("entryBox")) { // Makes sure the value of the entry box is not undefined, which would be prone to errors 

    userInput = (document.getElementById("entryBox").value).toLowerCase(); // Stores user input from the search bar

}

if (userInput == "hardware" ||	userInput == "software" || userInput == "hardware and software") { // If the user inputed SDG 9 (or something similar), then they are redirected to the SDG 9 page

    window.open("HardwareAndSoftware.html", "_self"); // For the time being, the function only opens an empty destination with a button to return to the homepage

}

else if (userInput == "artificial intelligence" || userInput == "ai") {

    window.open("TemporaryDestination.html", "_self");

}

else if (userInput == "competetive play" || userInput == "tournaments" || userInput == "competition" || userInput == "competitive chess" || userInput == "tournament chess") {

    window.open("TemporaryDestination.html", "_self");

}

else if (userInput == "broadcasting" || userInput == "radio" || userInput == "tv") {

    window.open("TemporaryDestination.html", "_self");

}

else if (userInput == "accessibility") {

    window.open("TemporaryDestination.html", "_self");

}

else {

    alert("No search results for " + userInput);

}

}

// -----------------------------

function selectTopic(topic) { // Finds the location of a selected element and sends the user's scroll to that location

    var element = document.getElementById(topic); 
    var rectangle = element.getBoundingClientRect(); // Creates a rectangle that includes the x, y position of the element in question
    window.scrollTo(rectangle.x, rectangle.y); // Scrolls to the obtained location

}

// -----------------------------

// The following website was used as a reference for the code beneath: https://chessboardjs.com/index.html

const KasparovDeepBlueRematchGame6Transcript = [ // Source: https://en.wikipedia.org/wiki/Deep_Blue_versus_Kasparov,_1997,_Game_6

    ["e2-e4", "", ""],
    ["c7-c6", "", "Kasparov responds with the Caro-Kann Defense, a book opening, but not one commonly played by the former world champion."],
    ["d2-d4", "", ""],
    ["d7-d5", "", ""],
    ["b1-c3", "", ""],
    ["d5-e4", "", ""],
    ["c3-e4", "", ""],
    ["b8-d7", "", ""],
    ["e4-g5", "", "This unique move breaks the opening principle of not moving a piece twice, but puts pressure on the f7 square."],
    ["g8-f6", "", "Playing h6 would actually have resulted in a mate-in-three, hence the avoidance of such a tempo by Kasparov."],
    ["f1-d3", "", ""],
    ["e7-e6", "", ""],
    ["g1-f3", "", ""],
    ["h7-h6", "", "This move was an inaccuracy by Kasparov, he possibly blundered the order of his moves, giving Deep Blue and opportunity."],
    ["g5-e6", "", "This seemingly crazy sacrifice was actually explicitly added to Deep Blue, it provides white with positional compensation."], 
    ["d8-e7", "", "Kasparov pins the e6 knight to give his king an escape route on d8 and take back the weak piece later."], 
    [["e1-g1", "h1-f1"], "", "Deep Blue castles and threatens to play rook e1 if Kasparov takes the knight with his queen, forcing him to do so with his pawn instead."],
    ["f7-e6", "", ""],
    ["d3-g6", "", ""],
    ["e8-d8", "", ""],
    ["c1-f4", "", "Deep Blue continues profiting of its sacrifice: this move would have been stopped by Kasparov's (cornered) bishop, but now his king is stuck."],
    ["b7-b5", "", "With this move, Kasparov intended to start developing pieces on his queenside, but it also opens his position up to more attacks."],
    ["a2-a4", "", ""],
    ["c8-b7", "", "b4 would have been better at protecting Kasparov's position, but it would have also closed it down, hence the more neutral bishop advance."],
    ["f1-e1", "", ""],
    ["f6-d5", "", ""],
    ["f4-g3", "", ""],
    ["d8-c8", "", ""],
    ["a4-b5", "", ""],
    ["c6-b5", "", ""],
    ["d1-d3", "", ""],
    ["b7-c6", "", ""],
    ["g6-f5", "", "Deep Blue is putting pressure on e6, and planning a rook-based infaltration, Kasparov gives up his material advantage to thwart the attack."],
    ["e6-f5", "", ""],
    ["e1-e7", "", ""],
    ["f8-e7", "", ""],
    ["c2-c4", "", "1-0, Kasparov resigns in this position. Deep Blue's queen will infiltrate and wreak havoc aided by playing rook e1, it's an undefendable scenario."],

];

// -----------------------------

var moveNumber = 0;

function forward() {

    KasparovDeepBlueRematchGame6Transcript[moveNumber][1] = board1.fen() // Stores the board's current position

    if (moveNumber != 16 && moveNumber < KasparovDeepBlueRematchGame6Transcript.length) {

        board1.move(KasparovDeepBlueRematchGame6Transcript[moveNumber][0]);

        moveNumber += 1;

    }

    else if (moveNumber == 16) { // Requires multiple calls of the move function because white castles

        board1.move(KasparovDeepBlueRematchGame6Transcript[moveNumber][0][0]);
        board1.move(KasparovDeepBlueRematchGame6Transcript[moveNumber][0][1]);

        moveNumber += 1;

    }

    console.log(moveNumber)

}

function backward() {

    if (moveNumber >= 1) {

        moveNumber -= 1;

        board1.position(KasparovDeepBlueRematchGame6Transcript[moveNumber][1]);

    }

    console.log(moveNumber);
}

stopped = true;

function pause () {

    stopped = true;

}

var sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay)) // Mimics a sleep function (not inherently present in JavaScript). Source: https://linuxhint.com/wait-sleep-code-execution-javascript/

var fastForward = async () => {

    stopped = false;

    while (stopped == false && moveNumber < KasparovDeepBlueRematchGame6Transcript.length) {

        forward();
        await sleep(1000); // Waits a second before the next move

    }

}

var fastBackward = async () => { // A mirror version of the 'fastForward' function

    stopped = false;

    while (stopped == false && moveNumber >= 1) {

        backward();
        await sleep(1000); 

    }

}

// -----------------------------

var annotationContainer = document.getElementById("chessBoardAnnotationsContainer");
var annotationText = document.getElementById("chessBoardAnnotations");

function annotate () { // This function provides annotations that accompany the chess game

    var annotation = KasparovDeepBlueRematchGame6Transcript[moveNumber - 1][2];

    if (annotation != "") {

        annotationText.innerHTML = annotation;
        annotationContainer.style.height = 84;
        annotationText.style.display = "block";
        annotationText.style.padding = 5;
        annotationText.style.height = 84;
        annotationText.style.borderStyle = "solid";
        annotationText.style.borderWidth =  "2px" 
        annotationText.style.borderColor = "black"

    }

    else {

        annotationContainer.style.height = 0;
        annotationText.style.display = "none";
        annotationText.style.padding = 0;
        annotationText.style.height = 0;

    }

}

// -----------------------------

var board1 = Chessboard("KasparovDeepBlueRematchGame6", { // A chess board object for game 6 of the Kasparov-Deep Blue rematch (where the machine finally won)
    
    position: "start",
    moveSpeed: "slow",
    snapbackSpeed: 500,
    snapSpeed: 100,
    onMoveEnd: annotate
    
    })    

// -----------------------------

// The following code is for the image carousel on the hardware and software web page, source: https://www.w3schools.com/howto/howto_js_slideshow.asp

// Store the current images of the carousels
var currentImageCarousel1 = 0; 
var currentImageCarousel2 = 0; 

const srcs = [ // Stores the srcs of the images in the carousel

	["BorisChessComputer.jpg", "FidelityVoiceChessChallenger.jpg", "MiltonBradleyGrandmaster.jpg"],
    ["ChessMaster2000.jpg", "BattleChess.jpg", "MacOSChess.jpg"]

]

const captions = [

    ["Boris chess computer, 1977", "Fidelity Voice Chess Challenger, 1979", "Milton Bradley Grandmaster, 1983"],
    ["Chess Master 2000, 1986", "Battle Chess, 1988", "Mac OS Chess"]

]

function displayNextImage(carouselNumber) { // Displays the next image in the carousel

	if (carouselNumber == 0 && currentImageCarousel1 <= srcs.length) { // If incrimenting currentImage is within the carousel, its corresponding image is displayed

        ++currentImageCarousel1;

		document.getElementById("carousel1").src = srcs[carouselNumber][currentImageCarousel1];

        document.getElementById("carouselCaption1").innerHTML = captions[carouselNumber][currentImageCarousel1];

		console.log("Displayed next image");

    }

    else if (carouselNumber == 1 && currentImageCarousel2 <= srcs.length) {

        ++currentImageCarousel2;

		document.getElementById("carousel2").src = srcs[carouselNumber][currentImageCarousel2];

        document.getElementById("carouselCaption2").innerHTML = captions[carouselNumber][currentImageCarousel2];

		console.log("Displayed next image");

	}

	if (carouselNumber == 0 && currentImageCarousel1 > srcs.length) { // The current image is reset and a nested function is called

        currentImageCarousel1 = -1;

        displayNextImage(0);

    }

	else if (carouselNumber == 1 && currentImageCarousel2 > srcs.length) {

        currentImageCarousel2 = -1;

        displayNextImage(1);

	}

}

function displayPreviousImage(carouselNumber) { // Displays the previous image in the carousel

	if (carouselNumber == 0 && currentImageCarousel1 > 0) { // If decreasing currentImage is within the carousel, its correlating image is shown

		--currentImageCarousel1;

		document.getElementById("carousel1").src = srcs[carouselNumber][currentImageCarousel1];

        document.getElementById("carouselCaption1").innerHTML = captions[carouselNumber][currentImageCarousel1];

		console.log("Displayed previous image");

	}

    else if (carouselNumber == 1 && currentImageCarousel2 > 0) {

        --currentImageCarousel2;

		document.getElementById("carousel2").src = srcs[carouselNumber][currentImageCarousel2];

        document.getElementById("carouselCaption2").innerHTML = captions[carouselNumber][currentImageCarousel2];

		console.log("Displayed previous image");

    }

	if (carouselNumber == 0 && currentImageCarousel1 < 1) { 

        currentImageCarousel1 = 3;

        displayPreviousImage(0);

    }

	else if (carouselNumber == 1 && currentImageCarousel2 < 1) {
            
        currentImageCarousel2 = 3;

        displayPreviousImage(1);

    }

}

// -----------------------------

// Below is the code for the quiz on the hardware and software web page

var questions = [ // An array that stores the questions of the quiz

	"What type of non-mechanical timers were used before chess clocks?",
	"Who invented the first complete game-playing chess algorithm?",
	"What was the name of the first self-moving chess computer?",
    "What was the first PC chess game?",
    "What is the most popular online chess website?"

];

var answers = [ // An array for the quiz answers

	"sand glasses",
	"Alan Turing",
	"Milton Bradley Grandmaster",
	"Chess Master 2000",
	"Chess.com",

];

var currentQuestion = 0; // Stores the current question from the array above

var correctAnswers = 0; // Stores the number of answers the user entered correctly

var start = true; // Stores whether the user has started the quiz

var restart = false; // Stores whether the user has restarted the quiz

function quizUser() {

	if (document.getElementById("answerBox").value || start == true) {

		document.getElementById("submitButton").innerHTML = "Submit"; // The submit button is reset just in case it was changed to retry when the user finished the quiz
		document.getElementById("answerBox").style.marginLeft = "375;"; // The same goes for the answer box
		document.getElementById("answer").innerHTML = ""; // The answer summary is also reset

		if (start == true || restart == true) {

			start = false; // The quiz has started

			restart = false;

			// The current question is displayed to the user
			document.getElementById("question").innerHTML = questions[currentQuestion]; 
			document.getElementById("question").style.color = "black";

			return;

		}

		var userResponse = (document.getElementById("answerBox").value).toLowerCase(); // A local variable for the user's answer to the current question

		var answer = answers[currentQuestion]; // Stores the current answer

		var correct = false; // stores whether the user answered the current question correctly

		if (userResponse == (answers[currentQuestion]).toLowerCase()) { // Checks if the user has the right response, and if so, adds to their score

			++correctAnswers;

			correct = true;

		}

		// Gives the user a summary of their response
		if (correct == true) {

			document.getElementById("answer").innerHTML = ("Correct! The answer was " + answer); // Gives the user a summary of their response
			document.getElementById("answer").style.color = "green";

		}

		else if (correct == false) {

			document.getElementById("answer").innerHTML = ("Incorrect, the answer was " + answer); // Gives the user a summary of their response
			document.getElementById("answer").style.color = "red";

		}

		if (currentQuestion == 4) {

			document.getElementById("submitButton").innerHTML = "Retry"; // The quiz has ended and the user now has the option to retry

			currentQuestion = 0; // The current question of the quiz is reset back to the beginning

			var score = ""; // Stores the score the user scored on the quiz

			var colour = ""; // stores the colour of the text in the score display

			if (correctAnswers <= 2) {

				score = "Better luck next time, you got " + correctAnswers + " out of 5 questions correct";
				colour = "red";

			}

			else if (correctAnswers < 5 && correctAnswers > 2) {

				score = "Well done, you got " + correctAnswers + " out of 5 questions correct";
				colour = "lightgreen";

			}

			else if (correctAnswers == 5) {

				score = "Awesome! You got " + correctAnswers + " out of 5 questions correct";
				colour = "green";

			}

			document.getElementById("question").innerHTML = score;
			document.getElementById("question").style.color = colour;

			correctAnswers = 0; // Resets the user's score

			restart = true; // The quiz has restarted

			return;

		}

		++currentQuestion;

		// The current question is displayed to the user
		document.getElementById("question").innerHTML = questions[currentQuestion]; 
		document.getElementById("question").style.color = "black";

	}

}

// -----------------------------

// The following function is for the sharing form at the end of the Hardware and Software page
function sendEmail () {

    navigator.clipboard.writeText("https://github.com/CedricFurman/Y10---Project-2.git").then(() => {

        alert("Copied to clipboard");

    });

    window.open("https://mail.google.com/mail/u/0/?tab=rm#inbox?compose=DmwnWrRqhKSKrjjpltftjlmBhsLTqPJpxsNCwSwrmjzzsCBvGHRKJRbDKcDLNffVBBkJKzJtJmdq");

}

// -----------------------------

const bibliographyLinks = [

    "https://www.chessclub.com",
    "https://www.chess.com",
    "https://www.lichess.org/",
    "https://www.twitch.tv",
    "https://www.pcworld.com/article/451599/a-brief-history-of-computer-chess.html",
    "http://www.chessmaniac.com/the-chess-clock-a-history/",
    "https://www.ibm.com/ibm/history/ibm100/us/en/icons/deepblue/",
    "https://www.chess-site.com/articles/technology-in-chess/",
    "https://en.wikipedia.org/wiki/Computer_chess#History",
    "https://en.wikipedia.org/wiki/Online_chess#:~:text=Online%20chess%20has%20existed%20in,chess%20websites%20have%20been%20developed",
    "https://en.wikipedia.org/wiki/Turochamp",
    "https://www.chesshistory.com/winter/extra/computers.html",

]

// This function is used for opening links in the bibliography
function openLink(number) {

    window.open(bibliographyLinks[number], "_blank");

}
