class Segment2D {
    /**
     * Defines a 2D segment
     * @param {number} x1 
     * @param {number} y1 
     * @param {number} x2 
     * @param {number} y2 
     */
    constructor (x1, y1, x2, y2) {
        this.vertexes = [new Vec2D(x1, y1), new Vec2D(x2, y2)];
    }
    /**
     * @returns {Vec2D}
     */
    getA () {
        return this.vertexes[0];
    }

    /**
     * @returns {Vec2D}
     */
    getB () {
        return this.vertexes[1];
    }
    /**
     * @returns {Vec2D}
     */
    getVectDir () {
        let a = this.getA(),
            b = this.getB();
        return new Vec2D(b.x - a.x, b.y - a.y);
    }

    /**
     * Checks if the current segment collides with a ray :
     * O(1) in time
     * @param {Ray} ray 
     * @returns {Vec2D|null}
     */
    collidesWith ( ray ) {
        let vdir = this.getVectDir ();
        // parallel if the 2d cross product between each direction is 0
        if ( MathTools.det(vdir, ray.direction) == 0 ) {
            // parallel
            // console.log('Parallel');
            return null;
        }
        // Ray(t) = Ro + rDir * t
        // Seg(u) = So +  AB * u (0 <= u <= 1 : segment domain no need to normalize AB) 
        let ro = ray.origin; // ray origin
        let rdir = ray.direction; // ray direction
        let so = this.getA(); // segment origin
        let u = ( rdir.x * (so.y - ro.y ) + rdir.y * ( ro.x - so.x )) / ( vdir.x * rdir.y  - vdir.y * rdir.x );
        let t = ( so.x + vdir.x * u - ro.x ) / rdir.x  ;

        if ( t < 0 || u < 0 || u > 1) return null;
    
        return new Vec2D(ro.x + rdir.x * t, ro.y + rdir.y *t);
    }
}