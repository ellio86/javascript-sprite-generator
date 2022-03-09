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