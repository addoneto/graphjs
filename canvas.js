class Canvas {
    constructor(id ,resX, resY, w, h, pixelDensity = 1) {
        this.id = id;
        this.resX = resX;
        this.resY = resY;
        this.width = w != 0 ? w : resX / pixelDensity;
        this.height = h != 0 ? h : resY / pixelDensity;
    }
    
    create() {
        // this.e = document.createElement("canvas");
        this.e = document.getElementById(this.id);
        this.e.width = this.resX;
        this.e.height = this.resY;
        this.e.style.width = this.width + "px";
        this.e.style.height = this.height + "px";
        this.ctx = this.e.getContext("2d");

        // document.getElementById(this.parentId).appendChild(this.e);
    }
}

export { Canvas };