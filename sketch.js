var blockWidth = 50;
var boardWidth = 10, boardHeight = 19;
var grid, counter = 0;
var colors = ["#ABDEE6", "#FF968A", "#97C1A9", "#CBAACB"];
var move = 0, speed = 30;
var currentX = 4;
var directions = [
    [-1, 0],
    [ 0,-1],
    [ 1, 0],
    [ 0, 1]
];

function setup() {
    createCanvas(blockWidth*boardWidth, blockWidth*boardHeight);
    grid = createMap(boardWidth, boardHeight);
}

function draw() {
    background(25);

    //DRAW BOARD
    for(var i = 0; i < boardWidth; i++){
        for(var j = 0; j < boardHeight; j++){
            if(grid[i][j] > -1){
                fill(colors[grid[i][j]]);
            }else{
                if(i == currentX){
                    fill(35);
                }else{
                    fill(25);
                }
            }
            stroke("#333");
            rect(i*blockWidth, j*blockWidth, blockWidth, blockWidth);
        }
    }

    //PLAY FRAME
    if(counter > speed){
        checkForConnections();
        var moved = false;
        for(var x = boardWidth-1; x >= 0; x--){
            for(var y = boardHeight-1; y >= 0; y--){
                if(grid[x][y] > -1){
                    if(grid[x][y+1] == -1 && y+1 != boardHeight){
                        grid[x][y+1] = grid[x][y];
                        grid[x][y] = -1;
                        moved = true;
                    }else{
                        grid[x][y] = parseInt(grid[x][y]);
                    }
                }
                if(x == 0 && y == 0 && moved == false){
                    //SPAWN NEW BLOCk
                    newBlock();
                }
            }
        }
    }
    counter = counter > speed ? 0 : counter+1;
}

//FUNCTIONS

function hasSameNeighbours(x,y){
    for(var d = 0; d < directions.length; d++){
        try {
            if(grid[x][y] == grid[x+directions[d][0]][y+directions[d][1]]){
                return true;
            }
        }catch{}
    }
}

function followConnection(blocks){
    for(var b = 0; b < blocks.length; b++){
        var neighbours = [];
        //CHECK NEIGHBOUR
        for(var d = 0; d < directions.length; d++){
            try{
                if(grid[blocks[b][0] + directions[d][0]][blocks[b][1] + directions[d][1]] == grid[blocks[b][0]][blocks[b][1]] && !blocks.includes([blocks[b][0] + directions[d][0], blocks[b][1] + directions[d][1]])){
                    neighbours.push([blocks[b][0] + directions[d][0], blocks[b][1] + directions[d][1]]);
                }
            }catch(e){print(e)}
        }
    }
    return blocks;
}

function checkForConnections(){
    for(var x = 0; x < boardWidth; x++){
        for(var y = 0; y < boardHeight; y++){
            if(typeof grid[x][y] != "string" && grid[x][y] != -1){
                if(hasSameNeighbours(x,y)){
                    print(followConnection([[x,y]]));
                }
            }
        }
    }
}

function newBlock(){
    if(grid[currentX][0] != -1){
        //LOSE
        grid = createMap(boardWidth, boardHeight);
    }else{
        grid[currentX][0] = getRandomInt(colors.length).toString();
    }
}

function keyPressed(){
    if(keyCode == LEFT_ARROW){
        moveBlock(-1);
    }
    if(keyCode == RIGHT_ARROW){
        moveBlock(1);
    }
    //SPACE
    if(keyCode == 32){
        drop();
    }
}

function easeInOutQuad (t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
}

function drop(){
    var r = true;
    while(r){
        var m = false;
        for(var x = boardWidth-1; x >= 0; x--){
            for(var y = boardHeight-1; y >= 0; y--){
                if(grid[x][y] > -1){
                    if(grid[x][y+1] == -1 && y+1 != boardHeight){
                        grid[x][y+1] = grid[x][y];
                        grid[x][y] = -1;
                        m = true;
                    }else{
                        grid[x][y] = parseInt(grid[x][y]);
                    }
                }
                if(x == 0 && y == 0 && m == false){
                    r = false;
                    counter = 0;
                    newBlock();
                }
            }
        }
    }
}

function moveBlock(dir){
    for(var x = boardWidth-1; x >= 0; x--){
        for(var y = boardHeight-1; y >= 0; y--){
            if(typeof grid[x][y] == "string" && x+dir != -1 && x+dir != boardWidth && grid[x+dir][y] == -1){
                grid[x+dir][y] = grid[x][y];
                currentX += dir;
                grid[x][y] = -1;
                return;
            }
        }
    }
}

function createMap(columnCount, rowCount){
    const grid = [];
    for(let x = 0; x < columnCount; x++){
        grid[x] = [];
        for(let y = 0; y < rowCount; y++){
            grid[x][y] = -1;
            //grid[x][y] = getRandomInt(colors.length);
        }
    }
    return grid;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}