// 1.Deposit
// 2.Determine the number of lines to bet on
// 3.Collect a bet amount
//4.spin slot machine
// 5.check if won
//6. give user their winnings
//7.play again

const prompt =require("prompt-sync")();

const deposit = () => {
    while (true){

        const depositAmount= prompt("Enter a deposit Amount: ");
        const numberDepositAmount=parseFloat(depositAmount);
        
        if (isNaN(numberDepositAmount)|| numberDepositAmount<=0){
            console.log("invalid deposit amount");
        }
        else {
            return numberDepositAmount;
        }
    }

};

const getNumberOfLines = () =>{
    while (true){
        const lines = prompt("Enter the number of lines to bet on (1-3)");
        const numberOfLines =parseFloat(lines);

        if (isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines>3){
            console.log("Invalid input");
        }
        else{
            return numberOfLines;
        }
    }
}

const getBet = (balance,lines) => {
    while (true){

        const bet = prompt("Enter the bet amount:");
        const numBet=parseFloat(bet);
        if (isNaN(numBet)|| numBet<=0 || numBet>balance/lines){
            console.log("Invalid entry");
        }   
        else {
            return numBet;
        }
    }
}

let balance=deposit();
const linereq=getNumberOfLines();
const bet = getBet(balance,linereq);



