let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let trunO = true;

const winpatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    trunO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
}

let count = 0;
boxes.forEach((box) => {    
    box.addEventListener("click", () => {
        console.log("button clicked");
        box.innerText = trunO ? "O" : "X";
        // if(trunO){
        //    document.body.childNodes[3].children[1].childNodes[1].children[count++].style.backgroundColor = "white";
        // }
        // else{
        //     document.body.childNodes[3].children[1].childNodes[1].childNodes[count++].style.backgroundColor = "black";
        // }
        trunO = !trunO;
        box.disabled = true;
        checkWinner();
        count++;
        if (count === 9) {
            msg.innerText = "It's a draw!";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    });

});

const disableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = true;      
    }
};

const enableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = false;      
        box.innerText = "";
    }
};

const showWinner = (winner) =>{
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winpatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2  &&  pos2  == pos3) {
                showWinner(pos1);
            }
        }
    }
};


newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);