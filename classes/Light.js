class Light {
    /**
     * Creates a new light source
     * @param {Vec2D} origin light source
     * @param {number} fov field of view (angle in radian)
     * @param {number} number_of_rays number of rays to project
     */
    constructor(origin, fov, number_of_rays) {
        this.origin = origin;
        this.fov    = fov;
        this.number_of_rays = number_of_rays;
        this.translate_teta = 0;
        this.init();
    }

    /**
     * Initializes the light source
     */
    init () {
        this.rays = [];
        this.dteta = this.fov / this.number_of_rays;
        for (let teta = 0.01; teta < this.fov; teta += this.dteta ) {
            let x = Math.cos(teta + this.translate_teta),
                y = Math.sin(teta + this.translate_teta);
            let direction = new Vec2D(x, y);
            let ray = new Ray(this.origin, direction);
            this.rays.push( ray );
        }
    }

    /**
     * @returns {Vec2D} average light direction
     */
    avgDirection () {
        let angle = this.fov / 2;
        return Vec2D.fromAngle( angle + this.translate_teta + 0.01 );
    }

    /**
     * @param {Vec2D} new_origin 
     */
    moveTo ( new_origin ) {
        this.origin = new_origin;
        this.init();
    }
    /**
     * @param {Vec2D} translate_vec 
     */
    translateTo ( translate_vec ) {
        this.origin.x += translate_vec.x;
        this.origin.y += translate_vec.y;
        this.init();
    }

    /**
     * @param {number} dteta 
     */
    increaseDirAngle ( dteta ) {
        this.translate_teta += dteta;
        this.init();
    }

    /**
     * Projects the light
     * @param {Segment2D} segments 
     * @param {Function} fun 
     */
    fire (segments, fun) {
        let intersects = [];
        for (let ray of this.rays) {
            // nearest intersection
            let intersect = ray.fire(segments);
            if ( intersect != null ) {
                if ( fun ) fun(intersect);
                intersects.push( intersect );
            }
        }
        return intersects;
    }
}