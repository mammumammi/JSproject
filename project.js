// 1.Deposit
// 2.Determine the number of lines to bet on
// 3.Collect a bet amount
//4.spin slot machine
// 5.check if won
//6. give user their winnings
//7.play again

const prompt =require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D:8
}

const SYMBOL_VALUES ={
    A:5,
    B:4,
    C:3,
    D:2
}






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

const spin = () =>{
    const symbols =[];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

    const reels=[];
    for (let i=0;i<COLS;i++){
        reels.push([]);
        const reelSymbols =[...symbols];
        for (let j=0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length)
            const selectedSymbol= reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;
};

const transpose = (reels) =>{
    const rows=[];

    for (let i=0;i<ROWS;i++){
        rows.push([]);
        for (let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows
};

const printRows = (rows) =>{
    for (const row of rows){
        let rowString = "";
        for (const [i,symbol] of row.entries()){
            rowString+=symbol;
            if (i!=row.length-1) {rowString+=" | "}

        }
        console.log(rowString);
    }


};

const getWinning = (rows,bet,lines) =>{
    let winnings = 0;

    for (let row=0;row<lines;row++){
        const symbols = rows[row];
        let allSame=true;

        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allSame=false;
                break;
            }
        }

        if (allSame){
            winnings+=bet*SYMBOL_VALUES[symbols[0]]
        }
    }

    return winnings;
}

const game = () =>{
    while (true){
        let balance=deposit();
        console.log("You have a balance of $" + balance);
        const linereq=getNumberOfLines();
        const bet = getBet(balance,linereq);
        balance-=bet*linereq;
        const reels = spin();
        const rows=transpose(reels);
        console.log(reels);
        console.log(rows);
        printRows(rows);
        const winnings=getWinning(rows,bet,linereq);
        balance+=winnings;
        console.log("You won, $" + winnings.toString());

        if (balance<=0){
            console.log("You ran out of money!");
            break;
        }
        const playAgain=prompt("Do you want to play again (y/n)?");

        if (playAgain != "y") break;
    }
};

game();
    

