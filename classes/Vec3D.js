class Vec3D {
    /**
     * Creates a new 3D vector
     * @param {number} x
     * @param {number} y 
     * @param {number} z
     */
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.dimension = 3;
    }

    /**
     * @param {number} factor
     * @returns {Vec3D} scaled vector
     */
    scale ( factor ) {
        return new Vec3D(factor * this.x, factor * this.y, factor * this.z);
    }

    /**
     * @returns {Vec3D} opposite vector
     */
    minus () {
        return this.scale(-1);
    }
    
    /**
     * @returns Vec3D the null vector
     */
    static Zero () {
        return new Vec3D(0, 0, 0);
    }
}