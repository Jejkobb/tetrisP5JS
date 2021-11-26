var blockWidth = 30;
var boardWidth = 10, boardHeight = 19;
var grid, counter = 0;
var colors = ["#ABDEE6", "#FF968A", "#97C1A9", "#CBAACB"];
var move = 0, speed = 30;
var currentX = 4;
var dir = [
    [-1, 0],
    [ 0,-1],
    [ 1, 0],
    [ 0, 1]
];
var emptyGrid = [];

function setup() {
    createCanvas(blockWidth*boardWidth, blockWidth*boardHeight);
    grid = createMap(boardHeight, boardWidth, -1);
    emptyGrid = createMap(boardWidth, boardHeight, false);
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
        for(var row = boardHeight-1; row >= 0; row--){
            for(var col = boardWidth-1; col >= 0; col--){
                if(grid[row][col] > -1){
                    if(grid[row][col+1] == -1 && col+1 != boardHeight){
                        grid[row][col+1] = grid[row][col];
                        grid[row][col] = -1;
                        moved = true;
                    }else{
                        grid[row][col] = parseInt(grid[row][col]);
                    }
                }
                if(row == 0 && col == 0 && moved == false){
                    //SPAWN NEW BLOCk
                    newBlock();
                }
            }
        }
    }
    counter = counter > speed ? 0 : counter+1;
}

//FUNCTIONS

function dfs(matrix, row, col, key){
    if(row < 0 || col < 0 || row >= boardHeight || col >= boardWidth){
        return 0;
    }
    if(matrix[row][col] != key){
        return 0;
    }
    var size = [[row,col]]
    matrix[row][col] = -1
    for(var d = 0; d < dir.length; d++){
        var arr = dfs(matrix, row+dir[d][0], row+dir[d][1], key)
        if(arr != 0){
            for(var a = 0; a < arr.length; a++){
                size.push(arr[a]);
            }
        }
    }
    return size
}

function checkForConnections(){
    var gridCopy = grid;
    for(var row = 0; row < boardHeight; col++){
        for(var col = 0; col < boardWidth; col++){
            if(typeof grid[row][col] != "string" && grid[row][col] != -1){
                var arr = dfs(gridCopy, row, col, grid[row][col]);
                if(arr != 0){
                    print(arr);
                }
            }
        }
    }
}

function newBlock(){
    if(grid[currentX][0] != -1){
        //LOSE
        grid = createMap(boardHeight, boardWidth, -1);
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

function createMap(height, width, value){
    const grid = [];
    for(let row = 0; row < height; row++){
        grid[row] = [];
        for(let col = 0; col < width; col++){
            grid[row][col] = value;
            //grid[x][y] = getRandomInt(colors.length);
        }
    }
    return grid;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}