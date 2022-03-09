var cellSize = 50;

class Cell {
    constructor(x, y, color, xoffset=0, yoffset=0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
    }

    // Check to see if the mouse is over this cell
    overCell(x, y) {  
        if (
            x > this.x * cellSize + this.xoffset &&
            x < this.x * cellSize + cellSize + this.xoffset &&
            y > this.y * cellSize + this.yoffset &&
            y < this.y * cellSize + cellSize + this.yoffset 
        ) {
            return true;
        }
        return false;
    }
}


class Grid {
    constructor(xsize = 8, ysize = 8, xoffset=0, yoffset=0) {
        this.xsize = xsize;
        this.ysize = ysize;
        this.xoffset = xoffset;
        this.yoffset = yoffset;
        this.grid = this.createGrid();
    }

    // Populates grid with white cells
    createGrid(palette=null) {
        var grid = [];
        for (var x = 0; x < this.xsize; x++) {
            grid[x] = []
            for (var y = 0; y < this.ysize; y++) {
                if (palette){
                    grid[x][y] = new Cell(x, y, palette.grid[0][0].color, this.xoffset, this.yoffset);
                }
                else {
                    grid[x][y] = new Cell(x, y, [255,255,255], this.xoffset, this.yoffset);
                }
            }
        }
        return grid;
    }

    setGridSize(xsize, ysize) {
        // WARNING: Resets the grid!
        this.xsize = xsize;
        this.ysize = ysize;
        this.grid = this.createGrid();
    }

    displayGrid() {
        for (var x = 0; x < this.xsize; x++) {
            for (var y = 0; y < this.ysize; y++) {
                var currentCell = this.grid[x][y];
                fill(currentCell.color[0], currentCell.color[1], currentCell.color[2]);
                rect(this.xoffset + x * cellSize, this.yoffset + y * cellSize, cellSize, cellSize);
            }
        }
    }

    getClickedCell() {
        for (var x = 0; x < this.xsize; x++) {
            for (var y = 0; y < this.ysize; y++) {
                if (this.grid[x][y].overCell(mouseX, mouseY))
                {
                    return this.grid[x][y];
                }
            }
        }
        return false;
    }

    // Change hovered cell's color to currentColor
    onClick(currentColor) {
        var cell = this.getClickedCell();
        if (cell) {
            cell.color = currentColor; 
        }
    }

    // TODO: Export Grid to svg/image file/text array
    exportGrid(palette) {
        var returnGrid = []
        for (var x = 0; x < this.xsize; x++) {
            returnGrid[x] = []
            for (var y = 0; y < this.ysize; y++) {
                var idx = palette.getPaletteIndex(this.grid[y][x].color);
                if (idx){
                    returnGrid[x][y] = idx;
                }
                else {
                    returnGrid[x][y] = 0;
                }
            }
        }
        return returnGrid;
    }

    update()
    {
        this.displayGrid();
    }
}

// Palettes have different behaviours to the grid, but the base structure is the same.
class Palette extends Grid {
    constructor(xsize=8, ysize=1, xoffset=0, yoffset=0) {
        super(xsize, ysize, xoffset, yoffset);
        this.populatePalette();
    }

    onClick(currentColor) {
        for (var x = 0; x < this.xsize; x++) {
            for (var y = 0; y < this.ysize; y++) {
                if (this.grid[x][y].overCell(mouseX, mouseY)) {
                    return this.grid[x][y].color;
                }
            }
        }
        return currentColor;
    }

    onRightClick(cell) {
        let newColor = prompt("Please enter a new color", "#ffffff");
        if (newColor){
            if (newColor[0] === '#' && newColor.length === 7) {
                var count = 0;
                for (var i = 1; i < 6; i += 2) {
                    var decVal = parseInt(newColor[i].concat(newColor[i+1]), 16);
                    cell.color[count] = decVal;
                    count++;
                }
            }
            else {
                console.log("Invalid Color");
            }
        }
    }

    getPaletteIndex(col) {
        for (var x = 0; x < this.xsize; x++) {
            for (var y = 0; y < this.ysize; y++){
                if (this.grid[x][y].color === col) {
                    return x;
                }
            }
        }
    }

    // TODO
    populatePalette() {
        for (var x = 0; x < this.xsize; x++) {
            for (var y = 0; y < this.ysize; y++) {
                this.grid[x][y].color = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];
            }
        }
        this.grid[0][0].color = [255, 255, 255];
    }

    update() {
        this.displayGrid(0);
    }
}


// MAIN PROGRAM AREA
var canvas;
var grid;
var palette;
var currentColor;
var leftClicked;
var rightClicked;
var submit;
var output;
var outputPs;

function setup() {
    canvas = createCanvas(400, 500);
    canvas.parent('sketch');
    grid = new Grid();
    palette = new Palette(8, 1, 0, 450);
    grid.grid = grid.createGrid(palette);
    currentColor = [255, 255, 0];
    leftClicked = false;
    rightClicked = false;
    background(51, 51, 51 ,51, 100);
    submit = select("#submit");
    output = select("#output");
    submit.mousePressed(onSubmit);
    outputPs = [];

    // Disable context menu (Right click) on canvas.
    canvas.elt.addEventListener("contextmenu", (e) => e.preventDefault());
}

function onSubmit() {
    if (outputPs.length === 0){
        for (var row = 0; row < grid.exportGrid(palette).length; row++) {
            var outputP = createP(grid.exportGrid(palette)[row]);
            outputP.parent(output);
            outputPs[row] = outputP;
        }
    }
    else {
        for (var row = 0; row < grid.exportGrid(palette).length; row++) {
            outputPs[row].html(grid.exportGrid(palette)[row]);
        }
    }
    
}

function mouseDragged() {
    if (leftClicked) {
        grid.onClick(currentColor);
    }
}

function mouseReleased() {
    leftClicked = false;
    rightClicked = false;
}

function mousePressed() {
    if (mouseButton === LEFT) {
        leftClicked = true;
        grid.onClick(currentColor);
        currentColor = palette.onClick(currentColor);
    }
    else if (mouseButton === RIGHT) {
        rightClicked = true;
        cell = palette.getClickedCell();
        if (cell) {
            palette.onRightClick(cell);
        }
    }
}

function draw() {
    grid.update();
    palette.update();
}