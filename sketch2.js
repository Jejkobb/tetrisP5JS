var w = 30;
var gwidth = 10, gheight = 19;
var grid, counter;
var currentX = 4;

function setup(){
    createCanvas(w*gwidth, w*gheight);
    grid = createMap(gwidth, gheight, -1);
}

function draw(){
    background(25);
    
    for(var row = 0; row < gheight; row++){
        for(var col = 0; col < gwidth; col++){
            if(grid[row][col] > -1){
                fill(colors[grid[row][col]]);
            }else{
                if(col == currentX){
                    fill(35);
                }else{
                    fill(25);
                }
            }
            stroke("#333");
            rect(col*w, row*w, w, w);
        }
    }
}

function createMap(width, height, value){
    var grid = [];
    for(var row = 0; row < height; row++){
        grid[row] = [];
        for(var col = 0; col < width; col++){
            grid[row][col] = value;
        }
    }
    return grid;
}