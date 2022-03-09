var cellSize = 50;

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