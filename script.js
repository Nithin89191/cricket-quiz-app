
const correctSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3");
const wrongSound = new Audio("https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3");

const database=[

{q:"Who is called God of Cricket?",a:["Sachin Tendulkar","Virat Kohli","MS Dhoni","Rohit Sharma"],c:0},
{q:"How many players in cricket team?",a:["9","10","11","12"],c:2},
{q:"Who won 2011 World Cup?",a:["India","Australia","England","Pakistan"],c:0},
{q:"Which country invented cricket?",a:["England","India","Australia","South Africa"],c:0},
{q:"Who scored fastest ODI century?",a:["AB de Villiers","Chris Gayle","Kohli","Rohit"],c:0},
{q:"Which IPL team has most titles?",a:["Mumbai Indians","CSK","KKR","RCB"],c:0},
{q:"Who is Captain Cool?",a:["MS Dhoni","Kohli","Rohit","Ponting"],c:0},
{q:"Where is Lord's ground?",a:["London","Delhi","Sydney","Dubai"],c:0},
{q:"Overs in T20?",a:["20","30","40","50"],c:0},
{q:"Who is Hitman?",a:["Rohit Sharma","Kohli","Dhoni","Warner"],c:0},
{q:"2019 World Cup winner?",a:["England","India","Australia","NZ"],c:0},
{q:"Rawalpindi Express?",a:["Shoaib Akhtar","Wasim Akram","Waqar","Imran"],c:0},
{q:"264 ODI runs record?",a:["Rohit Sharma","Sehwag","Kohli","Gayle"],c:0},
{q:"Proteas team?",a:["South Africa","India","Australia","England"],c:0},
{q:"IPL started in?",a:["2008","2005","2010","2000"],c:0}

];

let questions=[];
let score=0;
let qIndex=0;
let time=15;
let timer;
let level="Easy";
let bonus=1;

function startQuiz(){

document.getElementById("startScreen").style.display="none";
document.getElementById("quizContainer").style.display="block";

document.getElementById("music").play();

restartQuiz();

}

function shuffleArray(arr){

for(let i=arr.length-1;i>0;i--){

let j=Math.floor(Math.random()*(i+1));

[arr[i],arr[j]]=[arr[j],arr[i]];

}

return arr;

}

function restartQuiz(){

questions=shuffleArray([...database]).slice(0,10);

score=0;
qIndex=0;

loadQuestion();

}

function loadQuestion(){

clearInterval(timer);

document.getElementById("questionSound").play();

let q=questions[qIndex];

if(qIndex>=6){ level="Hard"; bonus=3;}
else if(qIndex>=3){ level="Medium"; bonus=2;}
else{ level="Easy"; bonus=1;}

document.getElementById("level").innerText=level;

document.getElementById("question").innerText=q.q;
document.getElementById("score").innerText=score;
document.getElementById("qnum").innerText=(qIndex+1)+"/10";

updateProgress();

const answersDiv=document.getElementById("answers");

answersDiv.innerHTML="";

let answers=q.a.map((t,i)=>({t,correct:i===q.c}));

shuffleArray(answers);

answers.forEach(ans=>{

let btn=document.createElement("button");

btn.innerText=ans.t;

btn.className="answer";

btn.onclick=()=>selectAnswer(ans.correct,btn);

answersDiv.appendChild(btn);

});

startTimer();

}

function selectAnswer(correct,btn){

if(correct){

btn.classList.add("correct");

score+=bonus;

correctSound.play();

}else{

btn.classList.add("wrong");

wrongSound.play();

}

clearInterval(timer);

setTimeout(nextQuestion,1000);

}

function nextQuestion(){

qIndex++;

if(qIndex<questions.length){

loadQuestion();

}else{

finishQuiz();

}

}

function startTimer(){

time=15;

document.getElementById("time").innerText=time;

timer=setInterval(()=>{

time--;

document.getElementById("time").innerText=time;

if(time===0){

clearInterval(timer);

nextQuestion();

}

},1000);

}

function updateProgress(){

let percent=((qIndex)/10)*100;

document.getElementById("progress-bar").style.width=percent+"%";

}

function finishQuiz(){

document.getElementById("question").innerText="Quiz Finished";

document.getElementById("answers").innerHTML="";

document.getElementById("result").innerText="Final Score: "+score;

if(score>=20){

document.getElementById("celebration").innerHTML="<div class='win'>🏆🎉</div>";

}else{

document.getElementById("celebration").innerHTML="👏 Good Job!";

}

}