class Ray {
    /**
     * Creates a new ray
     * @param {Vec2D} origin Light source 
     * @param {Vec2D} direction 
     */
    constructor(origin, direction) {
        this.origin    = origin;
        this.direction = MathTools.normalize( direction );
    }

    /**
     * @param {Segment2D[]} segments 
     */
    fire (segments) {
        let origin = this.origin;
        let interesect = null;
        let cur_dist = Infinity;
        for (let wall of segments) {
            let point = wall.collidesWith( this );
            if ( point != null ) {
                let temp = MathTools.squaredDist(origin, point);
                if ( cur_dist >= temp ) {
                    if ( wall.from != undefined ) {
                        point.from = wall.from;
                    }
                    interesect = point;
                    cur_dist = temp;
                } 
            }
        }
        if ( interesect != null ) {
            return interesect;
        }
        return interesect;
    }
}