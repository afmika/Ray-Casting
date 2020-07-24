const canvas   = document.getElementById("canvas");
const canvas3d = document.getElementById("canvas3d");
const ctx    = canvas.getContext('2d');
const ctx3d  = canvas3d.getContext('2d');
const width  = canvas.width;
const height = canvas.height;
const alpha  = 0.5;
const fps    = 24;
let MousePos = null;
let fov      = Math.PI / 8;

const light_source = new Light(new Vec2D(50, 50), fov, 100);
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
    "................"
];

const squares = generateSquares(grid_map, width, height);
scene.addItems( squares );

function projectOn3DScreen( intersects ) {
    ctx3d.fillStyle = 'black';
    ctx3d.fillRect(0, 0, canvas3d.width, canvas3d.height);
    if ( intersects.length == 0 )
        return;
    let max_dist = MathTools.dist(new Vec2D(canvas.width, canvas.height), Vec2D.Zero());
    let dim = canvas3d.width / intersects.length;
    for (let i = 0; i < intersects.length; i++) {
        const cur_point = intersects[i];
        let dist  = MathTools.dist( light_source.origin, cur_point );
            dist *= Math.cos( light_source.fov / 2 ); // projecting on the current dir
        // alert( dist + " VS "+ (dist / Math.cos( light_source.fov / 2 )));
        let scale  = dist / max_dist;
        let height = canvas3d.height - canvas3d.height * scale;
        if ( cur_point.from ) {
            if ( cur_point.from == 'Rectangle2D') {
                ctx3d.fillStyle = `rgb(120, 150, 255, ${1 - scale})`;
            } else {
                ctx3d.fillStyle = `rgb(255, 255, 255, ${1 - scale})`;
            }
        } else {
            ctx3d.fillStyle = `rgb(120, 150, 255, ${1 - scale})`;
        }
        // height + 2x = c3dheight
        // x => (c3dheight - height) * 0.5
        let yoffset = 0.5 * (canvas3d.height - height);
        ctx3d.fillRect(i * dim, yoffset, dim, height);
    }
}

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

    projectOn3DScreen( intersects );

    scene.eachSegment( wall => {
        drawSegment(wall);
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
        'UP'   : () => { light_source.translateTo(direction); },
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