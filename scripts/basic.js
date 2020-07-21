const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext('2d');
const width  = canvas.width;
const height = canvas.height;
const alpha = 0.5;
const fps = 24;
let MousePos = null;
let fov = 4 * Math.PI;

const light_source = new Light(new Vec2D(50, 50), fov, 300);
const scene = new Scene();
scene.create([
    new Segment2D(100, 40, 230, 230),
    new Segment2D(200, 100, 400, 300),

    new Rectangle2D(400, 60, 150, 200),
    new Rectangle2D(420, 68, 60, 60),
    new Rectangle2D(460, 180, 50, 50),
    new Rectangle2D(100, 350, 100, 70),
    new Rectangle2D(400, 320, 70, 100),

    new Polygon2D([
        new Vec2D(100, 200),
        new Vec2D(120, 130),
        new Vec2D(150, 200)
    ]),
    new Polygon2D([
        new Vec2D(700, 100),
        new Vec2D(750, 110),
        new Vec2D(780, 300),
        new Vec2D(600, 410),
        new Vec2D(580, 200)
    ]),

    // borders
    new Rectangle2D(0, 0, width, height)
]);

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

    let first = true;
    ctx.beginPath();
    ctx.fillStyle   = 'rgb(120, 100, 255, 0.2)';
    intersects.forEach(pt => {
        if ( first ) {
            ctx.moveTo(pt.x, pt.y);
            first = false;
        } else {
            ctx.lineTo(pt.x, pt.y);
        }
    });
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    scene.eachSegment( wall => {
        drawSegment(wall);
    });
}


canvas.addEventListener('mousemove', e => {
    let rect = canvas.getBoundingClientRect();
    MousePos = new Vec2D(e.clientX - rect.left, e.clientY - rect.top);
});


document.addEventListener('keydown', e => {
    if ( e.keyCode == 40 ) {
        light_source.increaseDirAngle(  0.1 );
    } else if ( e.keyCode == 38 ) {
        light_source.increaseDirAngle( -0.1 );
        console.log(e.keyCode);
    }
});

setInterval(anim, 1000 / fps);