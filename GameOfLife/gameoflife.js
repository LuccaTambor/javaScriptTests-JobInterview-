const rows = 10;
const cols = 10;

//2D Arrays
let currGen =[rows];
let nextGen =[rows];

let started=false;// Set to true when use clicks start
let timer;//To control evolutions
let evolutionSpeed=500;// Time between evolutions

// Creates two-dimensional arrays for the generations
function createGenArrays() {
    for (let i = 0; i < rows; i++) {
        currGen[i] = new Array(cols);
        nextGen[i] = new Array(cols);
    }
}

// Initializing the generation arrays
function initGenArrays() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            currGen[i][j] = 0;
            nextGen[i][j] = 0;
        }
    }
}

//Creating the base tablefor the game
function createWorld() {
    let world = document.querySelector('#world');
    let tbl = document.createElement('table');
    tbl.setAttribute('id','worldgrid');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '_' + j);
            cell.setAttribute('class', 'dead');
            cell.addEventListener('click',cellClick);            
            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}

// Changing the cell when the user clicks on it
function cellClick() {
    let loc = this.id.split("_");
    let row = Number(loc[0]);
    let col = Number(loc[1]);
    // Toggle cell alive or dead
    if (this.className==='alive'){
        this.setAttribute('class', 'dead');
        currGen[row][col] = 0;
    }
    else{
        this.setAttribute('class', 'alive');
        currGen[row][col] = 1;
    }
}

//starting the game on the webPage
window.onload=()=>{
    createWorld();// The visual table
    createGenArrays();// current and next generations
    initGenArrays();//Set all array locations to 0=dead
}

//Creating the next generation
function createNextGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
           
            let neighbors = getNeighborCount(row, col);
         
            // Checking the Game of live rules
            if (currGen[row][col] == 1) { // If Alive
              
                if (neighbors < 2) {
                    nextGen[row][col] = 0;
                } 
                else if (neighbors == 2 || neighbors == 3) {
                    nextGen[row][col] = 1;
                } 
                else if (neighbors > 3) {
                    nextGen[row][col] = 0;
                }
            } 
            else if (currGen[row][col] == 0) { // If Dead or Empty      
                if (neighbors == 3) {
                    // Propogate the species
                    nextGen[row][col] = 1;//Birth?
                }
            }
        }
    }  
}

//Updating the generations, the old dies the the new is the current one
function updateCurrGen() {
    for (row in currGen) {
        for (col in currGen[row]) {
            // Update the current generation with
            // the results of createNextGen function
            currGen[row][col] = nextGen[row][col];
            // Set nextGen array back to empty
            nextGen[row][col] = 0;
        }
    }
}

// Updating the table wuth the next generation
function updateWorld() {
    let cell='';
    for (row in currGen) {
        for (col in currGen[row]) {
            cell = document.getElementById(row + '_' + col);
            if (currGen[row][col] == 0) {
                cell.setAttribute('class', 'dead');
            } 
            else {
                cell.setAttribute('class', 'alive');
            }
        }
    }
}

//Resets the table and arrays
function resetWorld() {
    location.reload();
}

//Evolves the generation
function evolve(){
    createNextGen();//Apply the rules
    updateCurrGen();//Set Current values from new generation
    updateWorld();//Update the world view
    if (started) {
        timer = setTimeout(evolve, evolutionSpeed);
    }
}

//Starts and stops the evolution
function startStopGol(){
    let startstop=document.querySelector('#btnstartstop');
   
    if (!started) {
        started = true;
        startstop.value='Stop Evolution';
        evolve();
    } 
    else {
        started = false;
        startstop.value='Start Evolution';
        clearTimeout(timer); 
    }
}

//Counts the alive neighbors of a cell
function getNeighborCount(row, col) {
    let count = 0;
    let nrow=Number(row);
    let ncol=Number(col);
    
    //Checking if the cell is  not at the first row
    if (nrow - 1 >= 0) {
    //Check top neighbor
        if (currGen[nrow - 1][ncol] == 1) 
            count++;
    }
    //Checking if the cell is  not in the first cell
    //Upper left corner
    if (nrow - 1 >= 0 && ncol - 1 >= 0) {
        //Check upper left neighbor
        if (currGen[nrow - 1][ncol - 1] == 1) 
            count++;
    }
    // Checking if the cell is  not on the first row last column
    // Upper right corner
    if (nrow - 1 >= 0 && ncol + 1 < cols) {
        //Check upper right neighbor
        if (currGen[nrow - 1][ncol + 1] == 1) 
            count++;
    }
    // Checking if the cell is  not on the first column
    if (ncol - 1 >= 0) {
        //Check left neighbor
        if (currGen[nrow][ncol - 1] == 1) 
            count++;
    }
    // Checking if the cell is  not on the last column
    if (ncol + 1 < cols) {
        //Check right neighbor
        if (currGen[nrow][ncol + 1] == 1) 
            count++;
    }
    // Checking if the cell is  not on the bottom left corner
    if (nrow + 1 < rows && ncol - 1 >= 0) {
        //Check bottom left neighbor
        if (currGen[nrow + 1][ncol - 1] == 1) 
            count++;
    }
    // Checking if the cell is  not on the bottom right
    if (nrow + 1 < rows && ncol + 1 < cols) {
        //Check bottom right neighbor
        if (currGen[nrow + 1][ncol + 1] == 1) 
            count++;
    }
    
    // Checking if the cell is  not on the last row
    if (nrow + 1 < rows) {
        //Check bottom neighbor
        if (currGen[nrow + 1][ncol] == 1) 
            count++;
    }

    return count;
}