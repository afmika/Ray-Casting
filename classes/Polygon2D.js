class Polygon2D {
    /**
     * @param {Vec2D[]} vertexes 
     */
    constructor( vertexes ) {
        this.vertexes = vertexes;
        this.init();
    }

    init () {
        this.segments = [];
        let head = null;
        for (let vertex of this.vertexes) {
            if ( head != null ) {
                let seg = new Segment2D(head.x, head.y, vertex.x, vertex.y);
                this.segments.push( seg );
            }
            head = vertex;
        }
        let first = this.vertexes[0];
        this.segments.push( new Segment2D(head.x, head.y, first.x, first.y) );
    }

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