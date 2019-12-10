let SIZE = 5;
let WIN = 3;
const root = document.querySelector('#root');
let data;
let isPlayer1 = true;

function createSquare(data, row,col){
    let square = document.createElement('div');
    if(data[row][col] == 1){ //If == 1 => O
        square.innerHTML = 'O';
        square.classList.add('O');
        
    }
    else if(data[row][col] == -1){ //If == -1 => X
        square.innerHTML = 'X';
        square.classList.add('X');
        
    }
    return square;

}

function createGrid(SIZE, data){
    root.innerHTML = "";

    for(let row=0; row < SIZE; row++){

        let rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for(let col=0; col < SIZE; col++){
            let colElement = document.createElement('div');
            colElement.classList.add('col');
            colElement.setAttribute('row',row);
            colElement.setAttribute('col',col);

            let square = createSquare(data,row,col); //create square
            colElement.appendChild(square);

            rowElement.appendChild(colElement);
        }

        root.appendChild(rowElement);
    }

    document.querySelectorAll('.col').forEach(col => {
        col.addEventListener('click', handleClick);
    });
}

function checkWin(row,col,data){
   
    let gene = data[row][col];
    
    row = parseInt(row);
    col = parseInt(col);

    //check dọc
    for(let begin = row-WIN+1; begin <= row; begin++){
        if(begin < 0) continue;
        let verCount = 0;

        //check streak
        for(let i=begin; i < begin+WIN; i++){
            if(i >= SIZE) break;
            if(data[i][col] == gene){
                verCount++;
            }
        }
        
        if(verCount == WIN){
            console.log("win");
            return true;
        }
    }


    //check ngang
    for(let begin = col-WIN+1; begin <= col; begin++){
        if(begin < 0) continue;
        let verCount = 0;

        //check streak
        for(let i=begin; i < begin+WIN; i++){
            if(i >= SIZE) break;
            if(data[row][i] == gene){
                verCount++;
            }
        }
        
        if(verCount == WIN){
            return true;
        }
    }

    //check chéo trái -> phải

    for(let begin = col-WIN+1; begin <= col; begin++){
        if(begin < 0) continue;
        let crossCount = 0;
        //console.log({begin});
        //check streak
        for(let i=begin; i < begin+WIN; i++){
            if(i >= SIZE) break;
            if(row-(col-i) < 0 || row-(col-i) >= SIZE) break;
            
            //console.log({i,col,row});
            if(data[row-(col-i)][i] == gene)
                crossCount++;
            
        }
        //console.log(crossCount);
        if(crossCount == WIN){
            return true;
        }
    }


    //check cross phải -> trái
    for(let begin = row-WIN+1; begin <= row; begin++){
        if(begin < 0) continue;
        let crossCount = 0;
        //console.log({begin});
        //check streak
        for(let i=begin; i < begin+WIN; i++){
            if(i >= SIZE) break;
            if(col+(row-i) < 0 || col+(row-i) >= SIZE) break;
            
            //console.log({i,col,row});
            if(data[i][col+(row-i)] == gene)
                crossCount++;
            
        }
        //console.log(crossCount);
        if(crossCount == WIN){
            return true;
        }
    }
    
}

function updateGrid(row,col,isPlayer1){
    
    if(isPlayer1){
        data[row][col] = 1;
    }
    else{
        data[row][col] = -1;
    }

    createGrid(SIZE,data);
    
    if(checkWin(row,col,data)){
        if(isPlayer1){
            document.querySelector('#mess').innerHTML = "O is winner!";
            document.querySelectorAll('.col').forEach(col => {
                col.removeEventListener('click', handleClick);
            });
            //reset();
        }
        else{
            document.querySelector('#mess').innerHTML = "X is winner!";
            document.querySelectorAll('.col').forEach(col => {
                col.removeEventListener('click', handleClick);
            });
            //reset();
        }
    }
}

function handleClick(){
    let row = this.getAttribute('row');
    let col = this.getAttribute('col');
    
    if(data[row][col] == 0){
        updateGrid(row,col,isPlayer1);
        isPlayer1 = !isPlayer1;
        console.table(data);
    }
    
    
}

function reset(){
    WIN = parseInt(document.querySelector('#WIN').value);
    SIZE = parseInt(document.querySelector('#SIZE').value);
    console.log({WIN,SIZE});
    data = [];
    isPlayer1 = true;
    document.querySelector('#mess').innerHTML = "";
    for(let i=0; i < SIZE; i++){
        let row = [];
        for(let j=0; j<SIZE; j++){
            row.push(0);
        }
        data.push(row);
    }
    createGrid(SIZE,data);
}

reset();

document.querySelector('#reset').addEventListener('click',reset);