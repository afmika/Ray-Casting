const MathTools = {};
/**
 * Squared euclidean distance between two vectors
 * @param {Vec3D|Vec2D} vec1 
 * @param {Vec3D|Vec2D} vec2 
 */
MathTools.squaredDist = function(vec1, vec2) {
    let d  = Math.pow(vec1.x - vec2.x, 2);
        d += Math.pow(vec1.y - vec2.y, 2);
    if ( vec1.dimension == 3 ) {
        d += Math.pow(vec1.z - vec2.z, 2);
    }
    return d;
}

/**
 * Euclidean distance between two vectors
 * @param {Vec3D|Vec2D} vec1 
 * @param {Vec3D|Vec2D} vec2 
 */
MathTools.dist = function(vec1, vec2) {
    return Math.sqrt( MathTools.squaredDist(vec1, vec2) );
}

/**
 * Dot (scalar) product between two vectors
 * @param {Vec3D|Vec2D} vec1 
 * @param {Vec3D|Vec2D} vec2 
 */
MathTools.dot = function(vec1, vec2) {
    let dot  = vec1.x * vec2.x;
        dot += vec1.y * vec2.y;
    if (vec1.dimension == 3 ) {
        dot += vec1.z * vec2.z;
    }
    return dot;
}

/**
 * Det (cross) between two 2D vectors
 * @param {Vec2D} vec1 
 * @param {Vec2D} vec2 
 */
MathTools.det = function(vec1, vec2) {
    return vec1.x * vec2.y - vec1.y * vec2.x;
}

/**
 * Dot (scalar) product between two 3D vectors
 * @param {Vec3D} vec1 
 * @param {Vec3D} vec2 
 */
MathTools.cross = function(vec1, vec2) {
    let res = {
        x : vec1.y * vec2.z - vec1.z * vec2.y,
        y : vec1.z * vec2.x - vec1.x * vec2.z,
        z : vec1.x * vec2.y - vec1.y * vec2.x
    };
    return new Vec3D(res.x, res.y, res.z);
}

/**
 * Normalize a vector
 * @param {Vec2D|Vec3D} vec 
 */
MathTools.normalize = function(vec) {
    let d = MathTools.dist( vec, vec.dimension == 3 ? Vec3D.Zero() : Vec2D.Zero() );
    if ( d == 0 ) return vec.Zero();
    return vec.scale( 1 / d );
}