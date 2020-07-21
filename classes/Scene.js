class Scene {
    constructor() {
        this.segments  = [];
    }

    /**
     * @param {*} obj_array 
     */
    addItems ( obj_array ) {
        for (let obj of obj_array ) {
            if ( obj instanceof Segment2D ) {
                obj.from = 'Segment2D';
                this.segments.push( obj );
            } else {
                // a shape
                for (let seg of obj.segments) {
                    seg.from = 'Rectangle2D';
                    this.segments.push( seg );
                }
            }
        }        
    }

    /**
     * @param {*} obj_array 
     */
    create( obj_array ) {
        this.segments = [];
        this.addItems( obj_array );
    }

    /**
     * @returns {Segment2D}
     */
    getSegments () {
        if ( this.segments == undefined || this.segments == null ) {
            throw "The scene is empty";
        }
        return this.segments;
    }

    /**
     * Iterates over each segment
     * @param {Function} fun 
     */
    eachSegment( fun ) {
        if ( this.segments == undefined || this.segments == null ) {
            throw "The scene is empty";
        }
        for (let seg of this.segments ) {
            fun ( seg );
        }
    }
}