class Rectangle2D {
    /**
     * @param {number} x 
     * @param {number} y 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(x, y, width, height) {
        this.segments = [
            new Segment2D(x, y, x + width, y),
            new Segment2D(x + width, y, x + width, y + height),
            new Segment2D(x + width, y + height, x, y + height),
            new Segment2D(x, y + height, x, y)
        ];
    }
    /**
     * @param {number} angle 
     */
    rotate (angle) {
        let t = angle;
        for (let seg of this.segments) {
            for (let vertex of seg.vertexes ) {
                let [x, y] = [vertex.x , vertex.y];
                vertex.x = -x * Math.cos(t) + y * Math.sin(t);
                vertex.y =  x * Math.sin(t) + y * Math.cos(t); 
                // vertex.x += corner.x;
                // vertex.y += corner.y;
            }
        }
    }
}