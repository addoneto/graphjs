export default class Canvas {
    constructor(p, x, y, pd) {
        this.parent = p;
        this.res_x = x;
        this.res_y = y;
        this.pixel_density = pd;
        this.width = x / pd;
        this.height = y / pd;
        this.ctx = null;
        this.el = null;
    
        this.create();
    }

    create() {
        this.el = document.createElement("canvas");
        this.el.width = this.res_x;
        this.el.height = this.res_y;
        this.el.style.width = this.width + "px";
        this.el.style.height = this.height + "px";
        this.ctx = this.el.getContext("2d");
        this.parent.appendChild(this.el);
    }
}