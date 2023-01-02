var interval30;
var interval3;
var secondsLeft;
var difficultyPoints;
var questionNumber = 1;
var pointsArr = [];
var secondsLeftArr = [];
var region = "DEFAULT";
var playerName = "";
// 10 kategorier
var cats = ["Film & TV", "Food & Drink", "Arts & Literature", "Society & Culture", "Music", "Science", "Sport & Leisure", "Geography", "History", "General Knowledge"];

var currentQuestion = "Aktuell fråga...";
var currentIncorrectAnswers = ["a", "b", "c"];
var currentCorrectAnswer = "Aktuellt rätt svar...";
currentCorrectAnswerIndex = 573254;

// Array med poäng och bonuspoäng som numbers
var pointsArrAsNumbers = [];



function getRandomCat()
{

    return cats[Math.floor(Math.random()*10)];

}

showRules();


/*
Du ska skapa en quiz-app​
Skapa ett git-repo som heter <ditt namn>-testing_typescript-quiz_app​
Appen ska följa grundkraven (på föregående slide)​
Readme.md fil ska finnas med all information nödvändig för att starta appen
Integration ska gå mot Trivia.   ​
Spelet ska kunna fungera I singelplayer läge​
*/



//showSettings = confirm("Sätt spelinställningar?\n\n (Välj Avbryt för att spela med default-inställningar)");
function showSettings() {
    // region
    while (region != 's' && region != 'e') {
        region = prompt("Välj region (Obs: detta påverkar ej språk):\n\n's' för Sverige\n'e' for Storbritannien\n")
    }
    console.log("region  " + region);

    difficulty=-1;

    // DIFFICULTY
    while (!(difficulty in {
            1: 0,
            2: 0,
            3: 0,
            9: 0
        })) {
        difficulty = prompt("Välj svårighetsnivå\n\n1: enkelt\n2: medel\n3: svårt\n9: slumpad nivå för varje fråga")
    }

    // PLAYERNAME
    while (!(playerName.length > 0)) {
        playerName = prompt("Skriv ditt spelarnamn");
    }

    show3add("Namn: " + playerName + ", Språk: " + region + ", Svårighetsnivå: " + difficulty);

    showNewQuestion(1);
}


function setregion() {};
function setDifficulty() {};
function setPlayerName() {};

function showRules() {
    show("Regler för quiz");
    hide("#show3");
    show(`<pre>

Språk

Språket är engelska ('region' ändrar egentligen ingenting).


Poäng

Detta quiz består av 9 frågor. Svarstiden är 
maximalt 30 sekunder per fråga.

Grundpoäng för varje fråga räknas som antal sekunder kvar * svårighetsnivå (1-3).

En bonuspoäng tillförs också varje fråga om den är den tredje eller mer korrekta i rad. 
Bonus för en fråga = antal korrekta i rad den innebär - i kvadrat, (dvs. 9, 16, 25 osv.).

---------------

Kategorier

För varje ny fråga väljs en kategori.

- Om du svarat rätt får du själv välja mellan tre kategorier.

- Om du svarat fel slumpas en kategori fram.

---------------

Svårighetsnivå

Du kan välja mellan enkel (1), medel (2), svår (3) eller 
slumpnivå (vilket slumpar fram svårighetsnivå för varje fråga).

Svårighetsnivån inverkar alltså på poängen för ett korrekt svar.


</pre>

<p>
<button class='btn btn-primary btn-lg' onclick='hide(\"#show2\");difficulty=2;showNewQuestion( 1 )'> Fortsätt med grundinställningar >> </button>
<button class='btn btn-primary btn-lg' onclick='hide(\"#show2\");showSettings()'>Gör inställningar</button>
</p>
`);

}




function getDifficulty()
{
    if(difficulty == 9)
    {
        // Ska ge 1, 2 eller 3
        return Math.floor(Math.random()*3) +1;
        
    }
    else
    {
        return difficulty;
    }

}


function showNewQuestion(questionNumber, cat = "EJ SATT", difficulty = difficultyPoints, region) 
{

    difficultyPoints = getDifficulty();


    questionNumber = secondsLeftArr.length;
    questionNumber++;
    console.log("________________\nI showNewQuestion med ");
    console.log(arguments);
    console.log("____________________");

    if (questionNumber > 9) {
        show("DIN POÄNG: <p class='qheader'>"  + sumArray(pointsArrAsNumbers) + "</p>")
    } else {
        console.log("showNewQuestion med " + questionNumber);
        hide("#show2");

        // Om föregående gav poäng (dvs var rätt)
        if(secondsLeftArr[secondsLeftArr.length-1]>0)
            {
            var buttonCode = "<span onclick='showQuestionFromCat(" + questionNumber + ");hide(\"#show\")'><b>Fråga " + questionNumber + "</b></span> | Du svarade rätt! Välj själv nästa kategori<hr /><p>";
            buttonCode += get3UniqueCatsAsButtons() + "</p>"
            }
            else // Annars visas en slumpad kategori
            {
                cat = getRandomCat();

                buttonCode = "<p class='qheader'>Slumpad kategori</p><button class='btn btn-success btn-lg' onclick='hide(\"#show\");hide(\"#show2\"); showQuestionFromCat(\"" + cat + "\")'>" + cat + "</button> ";

            }


        show(buttonCode);

        // HÄR SKA JAG VISA TRE KATEGORIER (SÅVIDA RANDOM EJ ÄR VALT)
        // KANSKE SOM KNAPPAR ELLER LIKNANDE
    }

}


// Returns corresponding word 
function getDifficultyWord()
    {
        if(difficultyPoints == 1){ return "easy"}
        if(difficultyPoints == 2){ return "medium"}
        if(difficultyPoints == 3){ return "hard"}

    }

function getQuestionAndAlternatives(categ = 'music', difficulty = 'hard', region = 'se') {


    let str = 'https://the-trivia-api.com/api/questions?categories='
    str += categ;
    str += '&limit=1&region='
    str += region;
    str += '&difficulty=';
    str += getDifficultyWord();

    console.log(str);

    //alert(str);

    //https://the-trivia-api.com/api/questions?categories=film_and_tv&limit=1&region=SE&difficulty=hard
    let promise = fetch(str);

    promise
        .then(response => {
            console.log("RESP &&&&& ");
            let otherPromise = response.json();

            console.table(otherPromise);
            //console.table(otherPromise.json());
            return otherPromise;
        })
        .then(result => {

            console.log("A^^^^^^^^^^");
            console.table(result[0]);

            let actualResult = result[0];

            console.table(actualResult);

            currentQuestion = actualResult.question;
            currentIncorrectAnswers = actualResult.incorrectAnswers;
            currentCorrectAnswer = actualResult.correctAnswer;

            console.log( currentQuestion );
            console.log( currentIncorrectAnswers );
            console.log( currentCorrectAnswer  );
            return "KLAR"

        })
}



var latestCall = "";

function showQuestionFromCat(selectedCat) {

cl("showQuestionFromCat" + selectedCat);

    clearInterval(interval3);

    let cat = selectedCat.toLowerCase();
    let urlcat = cat.replace(/ /g, "_");
    urlcat2 = urlcat.replace(/&/g, "and");

        latestCall = questionNumber;
        getQuestionAndAlternatives(urlcat2);

        console.log("######  showQuestionFromCat " + questionNumber + " " + selectedCat.toLowerCase());
        let secondsLeftofThree = 3;

        interval3 = setInterval(() => {
            secondsLeftofThree--;

            if (secondsLeftofThree <= 0) {
                clearInterval(interval3);
                actualDisplayOfQuestion(questionNumber, selectedCat, currentQuestion, currentIncorrectAnswers, currentCorrectAnswer);
            }
            show2(" " + secondsLeftofThree);
            // IF TIME RUNS OUT
        }, 1000);

    
}




function actualDisplayOfQuestion(questionNumber, selectedCat, currentQuestion, currentIncorrectAnswers, currentCorrectAnswer) 
{
    // VISA FRÅGA FRÅN VALD KATEGORI, SVÅRIGHETSNIVÅ, SPRÅK
    secondsLeft = 30;
    show2(secondsLeft);

    showQuestionAndAlternatives(questionNumber, selectedCat, currentQuestion, currentIncorrectAnswers, currentCorrectAnswer) ;
    interval30 = setInterval(() => {
        secondsLeft--;
        show2(secondsLeft);

        // IF TIME RUNS OUT
        if (secondsLeft <= 0) {
            clearInterval(interval30);
            treatA(questionNumber, false, 0);
        } else {
                // HÄR: VISA FRÅGA MED ALTERANATIV

        }

    }, 1000);

}


function showQuestionAndAlternatives(questionNumber, selectedCat, currentQuestion, currentIncorrectAnswers, currentCorrectAnswer) 
{

    //var strArr = [ currentQuestion + "</p>"];

    altArr = [];
    // INSERT CORRECT ALT AT RANDOM POSITION
    let random0to2 = Math.floor(Math.random()*3);
    currentCorrectAnswerIndex = random0to2;

    for(let i=0,j=0; i<4; i++)
        {
            if( i == random0to2)
            {
                altArr.push(currentCorrectAnswer);
            }
            else
            {
                altArr.push(currentIncorrectAnswers[ j ]);
                j++;
            }
        }

        // SKAPA ALT-KNAPPAR OCH FRÅGA ATT VISA
        let outArr = ["<p class='qheader space'> " + questionNumber + " " + selectedCat +   " (" + getDifficultyWord() + ")</p><p class='space'>" +currentQuestion + "<hr class='space' />"];
        for(let i=0; i<4; i++)
            {
                outArr.push("<button class='btn btn-primary btn-lg' onclick='treatA("+ i +")'>" + altArr[ i ] + "</button>")
            }
        //alert(altArr.join("\n"));
        show(outArr.join(" "));

//
//show("<span onclick='clearInterval(interval30);treatA(" + questionNumber + "," + checkCorrect() + "," + secondsLeft + ")'><b>Visar fråga (" + questionNumber + ") för vald kategori: "+ selectedCat +"</b></span> (klicka för att svara)<p><span onclick='clearInterval(interval30);treatA(" + questionNumber + ",false,0 )'><b>SVARA FEL</b></span></p>");

}       

// TREATS POINTS AFTER AN ANSWER
function treatA(selectedAlt) {
    clearInterval(interval30);


console.log("questionNumber  selectedAlt   currentCorrectAnswerIndex  secondsLeft");
console.log(questionNumber +" "+selectedAlt +" "+ currentCorrectAnswerIndex +" "+ secondsLeft);

if(selectedAlt == currentCorrectAnswerIndex){isCorrect=true}else{isCorrect=false; secondsLeft=0};

if(isCorrect)
{
secondsLeftArr.push(secondsLeft);
}
else
{
secondsLeftArr.push(0);
}


show3add(questionNumber + " - Rätt svar?: " + isCorrect + " Tid kvar: " + secondsLeft + " | Poäng: " + getPointsForCurrentQuestion());




/*
    console.log("LÄGGER TILL " + secondsLeft + "i arrayen")
    secondsLeftArr.push(secondsLeft);

    console.log("#######treatA ");
    console.table(arguments);

    console.log("secondsLeftArr: " + secondsLeftArr);
    show3add(questionNumber + " - Rätt svar?: " + isCorrect + " Tid kvar: " + secondsLeft + " | Poäng: " + getPointsForCurrentQuestion());
*/


    if (questionNumber < 10) {
        showNewQuestion(questionNumber++);
    } else {
        show("questionNumber är över 9: Visa resultat");
    }

}


function getPointsForCurrentQuestion() 
{

    cl("*w*" + secondsLeft);            cl("*ww*" + difficultyPoints);
    let pointsA = secondsLeft * difficultyPoints;
    let pointsMsg = secondsLeft * difficultyPoints + " (" + secondsLeft + "*" + difficultyPoints +")";

cl("**" + pointsA);

    let bonusPoints = getBonusPoints(secondsLeftArr.length - 1);
    console.log("bonusPoints |||||||| " + bonusPoints);
    let pointsForQuestion = 0;

    if (bonusPoints) {
        pointsForQuestion = pointsMsg + " <span class='bonuspoints'> + " + bonusPoints + "</span>";
    } else {
        pointsForQuestion = pointsMsg;
    }

    pointsArr.push(pointsForQuestion);

    pointsArrAsNumbers.push(pointsA);
    pointsArrAsNumbers.push(bonusPoints);

    show2(sumArray(pointsArrAsNumbers) + " poäng");

    return pointsForQuestion + " | Totalt: <b>" + sumArray(pointsArrAsNumbers) + "</b>";




}

function sumArray(arr)
{
    let sum=0;
    for(let i=0; i<arr.length; i++)
        {
            sum+=arr[ i ];
        }
    return sum;
}

function getBonusPoints(questionNumber) {

    console.log("################ secondsLeftArr " + secondsLeftArr)

    // Bonus is relevant from question 3 and onwards
    let copy = secondsLeftArr.slice(0);

    let revArray = copy.reverse();
    console.log("################ revArray " + revArray);

    if (revArray.length <= 2 || revArray[0] == 0 || revArray[1] == 0 || revArray[2] == 0) {
        return 0
    }


    function changeNumsForBooleans(elem) {
        return elem > 0;
    }


    console.log("revArray --- !! " + revArray);

    let correctSeq = 0;
    // BONUS POINTS (WRONG ANSWER YIELDS "0" SECONDS LEFT)
    for (let i = 0; i < revArray.length; i++) {
        if (revArray[i] > 0) {
            correctSeq++;
            console.log("corr " + correctSeq);
        } else // Array is at its end or a "0" indicates a wrong answer
        {
            return correctSeq * correctSeq;
        }
    }
    return correctSeq * correctSeq;
}


function checkCorrect() {
    return true;
}



fill9With3Cats();
//
//
function fill9With3Cats() {
    let outputarr = [];
    for (let i = 0; i < 9; i++) {
        let temparr = [];
        while (temparr.length < 3) {
            temparr.push(Math.floor(Math.random() * 10));
            temparr = [...new Set(temparr)];
        }
        outputarr.push(temparr);
    }
    console.table(outputarr);
}


function get3UniqueCatsAsButtons() {
    let temparr = [];
    while (temparr.length < 3) {
        temparr.push(Math.floor(Math.random() * 10));
        // TA BOR DUBBLETTER:
        temparr = [...new Set(temparr)];
    }

    

    console.log(temparr);
    // Fyll med kategorinamn istället för index
    let outArr = [cats[temparr[0]], cats[temparr[1]], cats[temparr[2]]];
    console.log(outArr);

    return buttonsFromCatArr(outArr, temparr);
}

function buttonsFromCatArr(catArr, numArr) {
    console.log("buttonsFromCatArr " + catArr);

    

    var outStr = "<button class='btn  btn-lg btn-success' onclick='hide(\"#show\");hide(\"#show2\"); showQuestionFromCat(\"" + catArr[0] + "\")'>" + catArr[0] + "</button> ";
    outStr += " <button class='btn  btn-lg btn-success' onclick='hide(\"#show\");hide(\"#show2\");   showQuestionFromCat(\"" + catArr[1] + "\")'>" + catArr[1] + "</button> "
    outStr += "<button class='btn  btn-lg btn-success' onclick='hide(\"#show\");hide(\"#show2\");    showQuestionFromCat(\"" + catArr[2] + "\")'>" + catArr[2] + "</button>"

    cl(outStr);

    return outStr;
}