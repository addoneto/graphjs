export default class Dataset {
    constructor(p = [], c = "#000000") {
        this.points = p;
        this.points_color = c;
        this.points_size = 7;

        this.avg_x = 0;
        this.avg_y = 0;
        this.max_x = 0;
        this.min_x = 0;
        this.max_y = 0;
        this.min_y = 0;
    }

    update(points) {
        this.points = points;
    }
}