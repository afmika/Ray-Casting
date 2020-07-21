const canvas   = document.getElementById("canvas");
const ctx    = canvas.getContext('2d');
const width  = canvas.width;
const height = canvas.height;
const alpha  = 0.5;
const fps    = 24;
let MousePos = null;
let fov      = Math.PI / 3;

const light_source = new Light(new Vec2D(50, 50), fov, 350);
const scene = new Scene();
scene.create([
    // borders
    new Segment2D(0, 0, width, 0),
    new Segment2D(0, 0, 0, height),
    new Segment2D(width, 0, width, height),
    new Segment2D(width, height, 0, height)
]);

let grid_map = [
    "...............#",
    ".....#.....#....",
    "................",
    "..#.....#.......",
    ".....#..........",
    ".......#........",
    "...#.#......#...",
    "..#..#..........",
    "................",
    "#....#..........",
    "#.......#.......",
    "................",
    ".....#..........",
    "............#...",
    "......#.........",
    "............##.."
];

const squares = generateSquares(grid_map, width, height);
scene.addItems( squares );


function anim() {
    // clear the background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    if ( MousePos != null ) {
        drawPoint( MousePos );
        light_source.moveTo( MousePos );
    }

    let intersects = light_source.fire( scene.getSegments(), pt => {
        drawPoint( pt );
        drawLine(light_source.origin, pt, `rgb(120, 100, 255, 0.2)`);
    });
}


canvas.addEventListener('mousemove', e => {
    let rect = canvas.getBoundingClientRect();
    MousePos = new Vec2D(e.clientX - rect.left, e.clientY - rect.top);
});

document.addEventListener('keydown', e => {
    let keys = {
        87 : 'UP', 83 : 'DOWN',
        65 : 'LEFT', 68 : 'RIGHT',
        40 : 'DEC', 38 : 'INC'
    };
    const dp_factor = 5;
    let direction = light_source.avgDirection();
    direction = direction.scale( dp_factor );

    let funcs = {
        'UP'   : () => { light_source.translateTo(direction) },
        'DOWN' : () => { light_source.translateTo(direction.minus()); },
        'LEFT' : () => { light_source.increaseDirAngle( -0.1 ); },
        'RIGHT': () => { light_source.increaseDirAngle( 0.1 ); },
        'DEC'  : () => { light_source.increaseDirAngle( -0.1 ); },
        'INC'  : () => { light_source.increaseDirAngle( 0.1 ); }
    };
    
    let command = keys[e.keyCode];
    if ( command ) funcs[ command ] ();
});

setInterval(anim, 1000 / fps);