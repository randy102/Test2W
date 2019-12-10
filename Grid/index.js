const root = document.querySelector('#root');
let numCol, numRow, data;

function createCell(data, row,col){
    let square = document.createElement('div');
    square.innerHTML = data[row][col];

    return square;

}

function createGrid(numRow,numCol, data){
    root.innerHTML = "";
    
    let rowElement = document.createElement('div');
    rowElement.classList.add('header');

    for(let col=0; col < numCol; col++){
        let colElement = document.createElement('div');
        colElement.classList.add('col');
        colElement.setAttribute('col',col);

        let header = document.createElement('div');
        header.innerHTML = col;
        colElement.appendChild(header);

        rowElement.appendChild(colElement);
    }

    root.appendChild(rowElement);

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

    document.querySelectorAll('.header>.col').forEach(col => {
        col.addEventListener('click', sort);
    })

}

function addGrid(){
    let lastRow = data.length;

    for(let r=0; r < 100; r++){
        let row = [];
        for(let c=0; c < numCol; c++){
            row.push(Math.floor(Math.random() * (1000 - 1) ) + 1);
        }
        data.push(row);
    }
    numRow += 100;
    
    for(let row=lastRow; row < lastRow+100; row++){

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

function display(argRow, argCol){
    numCol = argCol || parseInt(document.querySelector('#col').value);
    numRow = argRow || parseInt(document.querySelector('#row').value);
    data = [];
    
    for(let r=0; r < numRow; r++){
        let row = [];
        for(let c=0; c<numCol; c++){
            row.push(Math.floor(Math.random() * (1000 - 1) ) + 1);
        }
        data.push(row);
    }
    
    createGrid(numRow,numCol,data);
}

function handleScroll(e){
    let windowBottom = window.scrollY + window.innerHeight;
    let rootHeight = root.offsetHeight + root.offsetTop;
    if(windowBottom > rootHeight){
        addGrid();
    }
    
}

function sort(){
    let col = this.getAttribute('col');
    let tempCol = data.map((row,index) => {
        return {index, val: row[col]};
    });
    let pattern = tempCol
        .sort((a,b) => {
            return a.val-b.val;
        })
        .map(temp => temp.index);
        
    let newData = [];

    for(let r = 0; r<numRow; r++){
        let tempRow = [];
        for(let c=0 ; c<numCol; c++){
            tempRow.push(data[pattern[r]][c]);
        }
        newData.push(tempRow);
    }

    data = newData;

    createGrid(numRow,numCol,data);
}

display();

document.querySelector('#display').addEventListener('click',()=>{
    display();
});
window.addEventListener('scroll', handleScroll);
