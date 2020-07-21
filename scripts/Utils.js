
/**
 * @param {Vec2D} v1 
 * @param {Vec2D} v2 
 */
function drawLine (v1, v2, color) {
    ctx.beginPath();
    ctx.strokeStyle = color || `rgb(255, 255, 255, ${ alpha })`;
    ctx.lineWidth = 1.2;
    ctx.moveTo(v1.x, v1.y);
    ctx.lineTo(v2.x, v2.y);
    ctx.stroke();
    ctx.closePath();
}

/**
 * @param {Segment2D} segment 
 * @param {string} color 
 */
function drawSegment( segment, color ) {
    drawLine(segment.getA(), segment.getB(), color);
}

/**
 * @param {Vec2D} vec 
 * @param {string} color 
 */
function drawPoint ( vec, color ) {
    ctx.beginPath();
    ctx.fillStyle = color || `rgb(255, 255, 255, ${ alpha })`;
    ctx.arc(vec.x, vec.y, 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
}

/**
 * @param {string[][]} map 
 * @param {number} container_width 
 * @param {number} container_height 
 */
function generateSquares ( map, container_width, container_height ) {
    let squares = [];
    let dim_width  = container_width / map[0].length; 
    let dim_height = container_height / map.length; 
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++ ) {
            let rect = null;
            let value = map[i][j];
            if ( value == '#' ) {
                rect = new Rectangle2D(j * dim_width, i * dim_height, dim_width, dim_height);
            } else if ( value == 'R') {
                rect = new Rectangle2D(j * dim_width, i * dim_height, dim_width, dim_height);
                rect.rotate(Math.PI / 3);
                // alert('yes');
                for (let seg of rect.segments) {
                    for (let vertex of seg.vertexes ) {
                        let [x, y] = [vertex.x, vertex.y];
                        // alert(JSON.stringify({x : x, y:y}));
                    }
                }
            }

            if ( rect != null ) {
                squares.push( rect );
            }
        }
    }
    return squares;
}