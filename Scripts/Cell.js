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