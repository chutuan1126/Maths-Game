var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('startreset').onclick = function () {
        if (playing === true) {
            playing = false;
            location.reload();
        }
        else {
            Hide('gameOver');
            playing = true;
            score = 0;

            document.getElementById('scorevalue').innerHTML = score;

            document.getElementById('startreset').innerHTML = 'Reset Game';

            Show('timeremaining');

            timeremaining = 60;
            document.getElementById('timeremainingvalue').innerHTML = timeremaining;

            startCountdown();

            generateQA();
        }
    }

    for (i = 1; i < 5; i++) {
        document.getElementById("box" + i).onclick = function () {
            //check if we are playing     
            if (playing == true) {//yes
                console.log(correctAnswer);
                if (this.innerHTML == correctAnswer) {
                    //correct answer

                    //increase score by 1
                    score++;
                    document.getElementById("scorevalue").innerHTML = score;
                    //hide wrong box and show correct box
                    Hide("wrong");
                    Show("correct");
                    setTimeout(function () {
                        Hide("correct");
                    }, 1000);

                    //Generate new Q&A

                    generateQA();
                } else {
                    //wrong answer
                    Hide("correct");
                    Show("wrong");
                    setTimeout(function () {
                        Hide("wrong");
                    }, 1000);
                }
            }
        }
    }

    function startCountdown() {
        var action = setInterval(function () {
            timeremaining -= 1;

            if (timeremaining == 0) {
                clearInterval(action);
                Show('gameOver');
                document.getElementById("gameOver").innerHTML = "<p>Game over!</p><p>Your score is " + score + ".</p>";
                Hide('timeremaining');
                Hide("correct");
                Hide("wrong");
                playing = false;
                document.getElementById("startreset").innerHTML = "Try Again";
            }

            document.getElementById('timeremainingvalue').innerHTML = timeremaining;
        }, 1000);
    }

    function generateQA() {
        var x = 1 + Math.round(9 * Math.random());
        var y = 1 + Math.round(9 * Math.random());

        const operator = {
            1: Add(x, y),
            2: SubX(x, y),
            3: SubY(x, y),
            4: Mul(x, y),
            5: DivX(x, y),
            6: DivY(x, y)
        }

        var randOperator = 1 + Math.round(5 * Math.random());

        if(randOperator === 5 || randOperator == 6) {
            correctAnswer = parseFloat(operator[randOperator]);
            correctAnswer = Math.round(correctAnswer * 1000)/1000;
        }

        else {
            correctAnswer = operator[randOperator];
        }

        switch (randOperator) {
            case 1:
                document.getElementById("question").innerHTML = x + "+" + y;
                break;
            case 2:
                document.getElementById("question").innerHTML = x + "-" + y;
                break;
            case 3:
                    document.getElementById("question").innerHTML = y + "-" + x;
                break;
            case 4:
                    document.getElementById("question").innerHTML = x + "x" + y;
                break;
            case 5:
                    document.getElementById("question").innerHTML = x + "/" + y;
                break;
            case 6:
                    document.getElementById("question").innerHTML = y + "/" + x;
                break;

            default:
                break;
        }

        var correctPosition = 1 + Math.round(3 * Math.random());
        document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer

        //fill other boxes with wrong answers

        var answers = [correctAnswer];

        for (i = 1; i < 5; i++) {
            if (i != correctPosition) {
                var wrongAnswer;
                var randOperatorwrong =1 + Math.round(5 * Math.random());

                if(randOperatorwrong === randOperator) {
                    if(randOperatorwrong === 6) {
                        randOperatorwrong -= 1;
                    }
                    else {
                        randOperatorwrong += 1;
                    }
                }

                wrongAnswer = operator[randOperatorwrong];

                if(randOperatorwrong === 5 || randOperatorwrong == 6) {
                    wrongAnswer = parseFloat(operator[randOperatorwrong]);
                    wrongAnswer = Math.round(wrongAnswer * 1000)/1000;
                }

                document.getElementById("box" + i).innerHTML = wrongAnswer;
                answers.push(wrongAnswer);
            }
        }
    }
}, false);

function Add(a, b) {
    return a + b;
}

function SubX(a, b) {
    return a - b;
}

function SubY(a, b) {
    return b - a;
}

function Mul(a, b) {
    return a * b;
}

function DivX(a, b) {
    return a / b;
}

function DivY(a, b) {
    return b / a;
}

function Hide(id) {
    document.getElementById(id).style.display = 'none';
}

function Show(id) {
    document.getElementById(id).style.display = 'block';
}