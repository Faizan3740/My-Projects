let gameSeq=[];
let userSeq=[];

let btns=["yellow","red","purple","green"];

let highScore=0;
let myScore=0;

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game is Started");
        started=true;

        levelUp();
    }
    
});

function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    myScore++;
   
    if(highScore<myScore){
        highScore=myScore;
    }
    h2.innerText=`level ${level}`;

    let randIdx=Math.floor(Math.random()*3);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        console.log("Same value");
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else{
        h2.innerHTML=`Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.body.style.backgroundColor="red";
        setTimeout(function(){
            document.body.style.backgroundColor="white";
        },150);
        h2.innerHTML+=`<br>High Score was ${highScore}`;
        // if(myScore>highScore){
        //     h2.innerHTML+=`<br>High Score was ${myScore}`;
        //     highScore=myScore;
        // }else{
        //     h2.innerHTML+=`<br>High Score was ${highScore}`;
        // }
        reset();
    }
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
    myScore=0;
}