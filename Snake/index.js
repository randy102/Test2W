const root = document.querySelector('#root');
const modeA = document.querySelector('#modA');
const modeB = document.querySelector('#modB');

let numCol = 20, numRow = 20, data, direction, moving ,tail = [];
let head = {
    x: 9,
    y:9
}
let ismodeA = true;

function createCell(data,row,col){
    let square = document.createElement('div');
    if(data[row][col] == 1){
        square.classList.add('snake');
    }
    else if(data[row][col] == 2){
        square.classList.add('food');
    }
    else if(data[row][col] == 3){
        square.classList.add('head');
    }

    return square;

}

function createGrid(numRow,numCol, data){
    root.innerHTML = "";

    for(let row=0; row < numRow; row++){

        let rowElement = document.createElement('div');
        rowElement.classList.add('row');

        for(let col=0; col < numCol; col++){
            let colElement = document.createElement('div');
            colElement.classList.add('col');
            colElement.setAttribute('row',row);
            colElement.setAttribute('col',col);

            let cell = createCell(data,row,col); 
            colElement.appendChild(cell);

            rowElement.appendChild(colElement);
        }

        root.appendChild(rowElement);
    }

}

function moveTail(oldX, oldY){
    let lastX = oldX, lastY=oldY;
    for(let i=0; i<tail.length; i++){
        let tempX = tail[i].x;
        let tempY = tail[i].y;

        tail[i].x = lastX;
        tail[i].y = lastY;

        lastX = tempX;
        lastY = tempY;

        data[tail[i].y][tail[i].x] = 1;
        data[lastY][lastX] = 0;
    }
}

function eatFood(x,y){
    tail.unshift({x,y});
    data[y][x] = 1;
    createFood();
}

function getNextStep(head){
    switch(direction){
        case "Down":
            head.y = head.y+1 < numRow ? head.y+1 : -2;
            break;
        case "Up":
            head.y = head.y-1 >= 0 ? head.y-1 : -1;
            break;
        case "Left":
            head.x = head.x-1 >= 0 ? head.x-1 : -1;
            break;
        case "Right":
            head.x = head.x+1 < numCol ? head.x + 1 : -2;
            break;
    }
    return head;
}

function checkModeA(head){
    if(head.x <= -1 || head.y <= -1){
        alert("Die");
        clearInterval(moving);
        return false;
    }else{
        for(let i=0; i<tail.length; i++){
            if(head.x == tail[i].x && head.y == tail[i].y){
                alert("Die");
                clearInterval(moving);
                return false;
            }
        }
        return true;
    }
}

function move(){
    data[head.y][head.x] = 0;
    let oldX = head.x, oldY = head.y;

    head = getNextStep(head);
    
    if(ismodeA){
        if(!checkModeA(head)) {
            if(head.x > -1 && head.y > -1){
                data[head.y][head.x] = 3;
            }
            start();
            return;
        }
    }else{
        
        if(head.y === -1){
            head.y = numRow-1;
        }
        else if(head.y === -2){
            head.y = 0;
        }
        else if(head.x === -1){
            head.x = numCol-1;
        }
        else if(head.x === -2){
            head.x = 0;
        }
    }

    if(data[head.y][head.x] == 2){
        eatFood(oldX,oldY);
    }
    else{
        moveTail(oldX,oldY);
    }

    data[head.y][head.x] = 3;
    
    createGrid(numRow,numRow,data);
}

function getOppositeDir(dir){
    switch(dir){
        case "Down": return "Up";
        case "Up": return "Down";
        case "Left": return "Right";
        case "Right": return "Left";
    }
}

function navigate(e){
    let keyName = e.key;

    let curKey = "Arrow"+direction;
    let oppKey = "Arrow"+getOppositeDir(direction);
    if(keyName === curKey || keyName === oppKey) return;

    switch(keyName){
        case "ArrowDown":
            direction = "Down";
            move();
            break;
        case "ArrowUp":
            direction = "Up";
            move();
            break;
        case "ArrowLeft":
            direction = "Left";
            move();
            break;
        case "ArrowRight":
            direction = "Right";
            move();
            break;
    }
    clearInterval(moving);
    moving = setInterval(move,1000);
}

function createFood(){
    let randX;
    let randY;
    do{
        randX = Math.floor(Math.random() * 20 );
        randY = Math.floor(Math.random() * 20 );
    }
    while(data[randY][randX] != 0);

    data[randY][randX] = 2;
    createGrid(numRow,numRow,data);
}


function start(argRow, argCol){
    clearInterval(moving);
    head = {
        x: 9,
        y:9
    };
    tail = [];
    data = [];
    
    for(let r=0; r < numRow; r++){
        let row = [];
        for(let c=0; c<numCol; c++){
            row.push(0);
        }
        data.push(row);
    }

    data[9][9] = 3; //init
    
    createGrid(numRow,numCol,data);

    createFood();
}

start();

window.addEventListener('keydown', navigate);
document.querySelector('#reset').addEventListener('click',function(){ start() });
document.querySelectorAll('input[type="radio"]').forEach(inp => {
    inp.addEventListener('change', function () {
        console.log(this.value);
        if(this.value == "a")
            ismodeA = true;
        else 
            ismodeA = false;
        console.log(ismodeA);
    });

    inp.addEventListener('keydown', function(e){
        e.preventDefault();
        return;
    })
});

