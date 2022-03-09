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
    leftClicked = false;6
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