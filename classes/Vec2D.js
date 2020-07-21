class Vec2D {
    /**
     * Creates a new 2D vector
     * @param {number} x
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dimension = 2;
    }

    /**
     * @param {number} factor
     * @returns {Vec2D} scaled vector
     */
    scale ( factor ) {
        return new Vec2D(factor * this.x, factor * this.y);
    }

    /**
     * @returns {Vec2D} opposite vector
     */
    minus () {
        return this.scale(-1);
    }
    
    /**
     * @returns {Vec2D} the null vector
     */
    static Zero() {
        return new Vec2D(0, 0);
    }

    /**
     * @param {number} angle
     */
    static fromAngle ( angle ) {
        return new Vec2D(Math.cos(angle), Math.sin(angle));
    }
}