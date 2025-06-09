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

    resize(img_width, img_height, container_width, container_height){
        this.res_x = img_width;
        this.res_y = img_height;

        this.height = container_height;
            this.width = container_height * (img_width / img_height);

        if(this.width > img_width / this.pixel_density || this.height > img_height / this.pixel_density) {
            this.width = img_width / this.pixel_density;
            this.height = img_height / this.pixel_density;
        }

        this.el.width = this.res_x;
        this.el.height = this.res_y;
        this.el.style.width = this.width + "px";
        this.el.style.height = this.height + "px";
    }

    download(n){
        const img = this.el.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = img;
        link.download = `graph-${n}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}