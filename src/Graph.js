import { exp, quadratic, senoic, mov } from "./test-datasets.js";
import Dataset from "./Dataset.js";

let debug_mode = true;

const defjson = new Request("src/default-graph.json");

export default class Graph {
    constructor(canvas, editor) {
        this.img_width = 2000;
        this.img_height = 1150;

        this.graph_width = 1700;
        this.graph_height = 900;

        this.totalpoints = [];
        this.data_sets = [];
        this.fit_curves = [];

        this.avg_x_dist = 0;
        this.avg_y_dist = 0;
        this.max_x = 0;
        this.max_y = 0;
        this.min_x = 0;
        this.min_y = 0;
        this.avg_y_dist_order = 0;
        this.avg_x_dist_order = 0;
        this.avg_y_dist_step = 0;
        this.avg_x_dist_step = 0;
        this.frame_y_max = 0;
        this.frame_x_max = 0;
        this.frame_y_min = 0;
        this.frame_x_min = 0;
        this.x_grid_cells = 0;
        this.x_grid_cell_size = 0;
        this.y_grid_cells = 0;
        this.y_grid_cell_size = 0;
        this.frame_x_range = 0;
        this.frame_y_range = 0;
        this.pixels_per_unit_x = 0;
        this.pixels_per_unit_y = 0;

        this.max_grid_x = 10;
        this.max_grid_y = 10;
        this.x_grid_step = 1;
        this.y_grid_step = 1;

        this.rect = {
            x: 0,
            y: 0,
            right: 0,
            bottom: 0
        }

        this.canvas = canvas;
        this.ctx = canvas.ctx;

        this.config = {
            bg_color: "#ffffff",
            title: {
                txt: "Título do Gráfico",
                font: "Computer-Modern-Bold",
                font_size: 50,
                font_color: "#000000",
                margin: 20,
            },
            labels: {
                x_txt: "Eixo X",
                y_txt: "Eixo Y",
                font: "Computer-Modern",
                font_size: 40,
                font_color: "#000000",
                margin_top: 40,
                margin_right: 90,
            },
            coordinates: {
                font: "Computer-Modern",
                font_size: 30,
                font_color: "#000000",
                decimals: 2,
                margin_bottom: 30,
                margin_right: 10
            },
            axis: {
                color: "#000000",
                line_width: 2,
            },
            grid: {
                color: "#cccccc",
                line_width: 1,
            }
        }

        this.setSettings(editor);
    }

    render() {
        // if (!this.ctx) this.ctx = ctx;

        this.ctx.fillStyle = this.config.bg_color;
        this.ctx.fillRect(0, 0, this.img_width, this.img_height);

        this.drawAxis();
        this.drawTitle();
        this.drawLabels();

        this.updateTotalPoints();

        this.sortTotalPoints();

        if(this.totalpoints.length === 0) return;
        
        this.getFrameBoundaries();
        this.drawGridCoordinates();
        this.drawGridLines();

        this.drawFitLines();
        this.drawDataSets();
    }

    updateTotalPoints() {
        this.totalpoints = [];
        this.data_sets.forEach(data_set => {
            this.totalpoints = this.totalpoints.concat(data_set.points);
        });
    }

    sortTotalPoints() {
        Graph.quicksort(this.totalpoints, 0, this.totalpoints.length - 1);
    }

    static quicksort(arr, left, right) {
        if (left < right) {
            let pivot = Graph.partition(arr, left, right);
            Graph.quicksort(arr, left, pivot - 1);
            Graph.quicksort(arr, pivot + 1, right);
        }
    }

    static partition(arr, left, right) {
        let pivot = arr[right][0];
        let i = left - 1;
        for (let j = left; j < right; j++) {
            if (arr[j][0] <= pivot) {
                i = i + 1;
                let tswap = arr[i];
                arr[i] = arr[j];
                arr[j] = tswap;
            }
        }
        let tswap = arr[i + 1];
        arr[i + 1] = arr[right];
        arr[right] = tswap;
        return i + 1;
    }

    static round(n, order, round_up = true) {
        let x = n;
        let mag = Math.pow(10, order);

        if(x % mag !== 0) {
            x = round_up ? x + mag : x - mag;
            x -= x % mag;
        }

        return x;
    }

    getFrameBoundaries() {
        this.max_x = this.totalpoints[this.totalpoints.length - 1][0];
        this.min_x = this.totalpoints[0][0];

        this.max_y = this.totalpoints[0][1];
        this.min_y = this.totalpoints[0][1];

        for (let i = 1; i < this.totalpoints.length; i++) {
            if (this.totalpoints[i][1] > this.max_y) {
                this.max_y = this.totalpoints[i][1];
            } else if (this.totalpoints[i][1] < this.min_y) {
                this.min_y = this.totalpoints[i][1];
            }

            this.avg_y_dist += (this.totalpoints[i][1] - this.totalpoints[i - 1][1]);
            this.avg_x_dist += (this.totalpoints[i][0] - this.totalpoints[i - 1][0]);
        }

        this.avg_x_dist = Math.abs(this.avg_x_dist / this.totalpoints.length);
        this.avg_y_dist = Math.abs(this.avg_y_dist / this.totalpoints.length);

        this.avg_y_dist_order = Math.round(Math.log10(this.avg_y_dist));
        this.avg_x_dist_order = Math.round(Math.log10(this.avg_x_dist));

        this.avg_y_dist_step = Math.pow(10, this.avg_y_dist_order);
        this.avg_x_dist_step = Math.pow(10, this.avg_x_dist_order);

        this.frame_y_max = Graph.round(this.max_y, this.avg_y_dist_order);
        this.frame_x_max = Graph.round(this.max_x, this.avg_x_dist_order);

        this.frame_y_min = Graph.round(this.min_y, this.avg_y_dist_order, false);
        this.frame_x_min = Graph.round(this.min_x, this.avg_x_dist_order, false);



        this.frame_y_range = this.frame_y_max - this.frame_y_min;
        this.frame_x_range = this.frame_x_max - this.frame_x_min;

        this.pixels_per_unit_x = this.graph_width / this.frame_x_range;
        this.pixels_per_unit_y = this.graph_height / this.frame_y_range;

        if (debug_mode) {
            console.log(`X) \n max: ${this.max_x} \n min: ${this.min_x} \n avg dist: ${this.avg_x_dist} \n avg order: ${this.avg_x_dist_order} \n avg decimal step: ${this.avg_x_dist_step}`);
            console.log(`Y) \n max: ${this.max_y} \n min: ${this.min_y} \n avg dist: ${this.avg_y_dist} \n avg order: ${this.avg_y_dist_order} \n avg decimal step: ${this.avg_y_dist_step}`);
            console.log("Frame Boundaries");
            console.log(`X) \n frame max ${this.frame_x_max} \n frame min ${this.frame_x_min}`);
            console.log(`Y) \n frame max ${this.frame_y_max} \n frame min ${this.frame_y_min}`);
        }
    }

    realToGraphCoordinates(p) {
        let abs_pixel_coordinates = [];
        let rel_pixel_coordinates = [];

        abs_pixel_coordinates[0] = (p[0] - this.frame_x_min) * this.pixels_per_unit_x;
        abs_pixel_coordinates[1] = (p[1] - this.frame_y_min) * this.pixels_per_unit_y;

        rel_pixel_coordinates[0] = this.rect.x + abs_pixel_coordinates[0];
        rel_pixel_coordinates[1] = this.rect.bottom - abs_pixel_coordinates[1];

        return rel_pixel_coordinates;
    }

    drawAxis() {
        this.ctx.strokeStyle = this.config.axis.color;
        this.ctx.lineWidth = this.config.axis.line_width;

        this.rect.x = (this.img_width - this.graph_width) / 2;
        this.rect.y = (this.img_height - this.graph_height) / 2;
        this.rect.bottom = (this.img_height + this.graph_height) / 2;
        this.rect.right = (this.img_width + this.graph_width) / 2;

        this.ctx.beginPath();
        this.ctx.moveTo(this.rect.x, this.rect.y);
        this.ctx.lineTo(this.rect.x, this.rect.bottom);
        this.ctx.lineTo(this.rect.right, this.rect.bottom);
        this.ctx.lineTo(this.rect.right, this.rect.y);
        this.ctx.lineTo(this.rect.x, this.rect.y);
        this.ctx.stroke();
    }

    drawTitle() {
        let cfont = `${this.config.title.font_size}px ${this.config.title.font}`;
        document.fonts.load(cfont).then(() => {
            this.ctx.font = cfont;
            this.ctx.fillStyle = this.config.title.font_color;
            this.ctx.textAlign = "center";
            this.ctx.fillText(this.config.title.txt, this.img_width / 2, this.rect.y - this.config.title.margin);
        });
    }

    drawGridLines() {
        this.ctx.strokeStyle = this.config.grid.color;
        this.ctx.lineWidth = this.config.grid.line_width;

        this.x_grid_cells = this.frame_x_range / this.avg_x_dist_step;
        this.x_grid_cell_size = this.graph_width / this.x_grid_cells;

        // poderia tbm setar o grid_cells para o número máximo e recalcular o _size

        if (this.x_grid_cells > this.max_grid_x) {
            this.x_grid_step = Math.ceil(this.x_grid_cells / this.max_grid_x);
        }

        for (let i = this.x_grid_step; i < this.x_grid_cells; i += this.x_grid_step) {
            let x = this.rect.x + i * this.x_grid_cell_size;

            this.ctx.beginPath();
            this.ctx.moveTo(x, this.rect.y);
            this.ctx.lineTo(x, this.rect.bottom);
            this.ctx.stroke();
        }

        this.y_grid_cells = this.frame_y_range / this.avg_y_dist_step;
        this.y_grid_cell_size = this.graph_height / this.y_grid_cells;

        if (this.y_grid_cells > this.max_grid_y) {
            this.y_grid_step = Math.ceil(this.y_grid_cells / this.max_grid_y);
        }

        for (let i = this.y_grid_step; i < this.y_grid_cells; i += this.y_grid_step) {
            let y = this.rect.bottom - i * this.y_grid_cell_size;

            this.ctx.beginPath();
            this.ctx.moveTo(this.rect.x, y);
            this.ctx.lineTo(this.rect.right, y);
            this.ctx.stroke();
        }
    }

    drawGridCoordinates() {
        let cfont = `${this.config.coordinates.font_size}px ${this.config.coordinates.font}`;
        document.fonts.load(cfont).then(() => {

            this.ctx.font = cfont;
            this.ctx.fillStyle = this.config.coordinates.font_color;
            this.ctx.textAlign = "center";

            for (let i = 0; i <= this.x_grid_cells; i += this.x_grid_step) {
                let label_txt = (this.frame_x_min + i * this.avg_x_dist_step)
                if(decimalPlaces(label_txt) > this.config.coordinates.decimals) {
                    label_txt = label_txt.toFixed(this.config.coordinates.decimals)
                }
                label_txt = label_txt.toString();
                let x = this.rect.x + i * this.x_grid_cell_size;

                this.ctx.fillText(label_txt, x, this.rect.bottom + this.config.coordinates.margin_bottom);
            }

            this.ctx.textAlign = "right";

            for (let i = 0; i <= this.y_grid_cells; i += this.y_grid_step) {
                let label_txt = (this.frame_y_min + i * this.avg_y_dist_step);
                if(decimalPlaces(label_txt) > this.config.coordinates.decimals) {
                    label_txt = label_txt.toFixed(this.config.coordinates.decimals)
                }
                label_txt = label_txt.toString();
                let y = this.rect.bottom - i * this.y_grid_cell_size;
                y += (this.config.coordinates.font_size / 2) - 5;

                this.ctx.fillText(label_txt, this.rect.x - this.config.coordinates.margin_right, y);
            }

        });
    }

    drawLabels() {
        let cfont = `${this.config.labels.font_size}px ${this.config.labels.font}`;
        document.fonts.load(cfont).then(() => {
            this.ctx.font = cfont;
            this.ctx.fillStyle = this.config.labels.font_color;
            this.ctx.textAlign = "center";

            let bottom_y = this.rect.bottom + this.config.labels.font_size + this.config.labels.margin_top;
            this.ctx.fillText(this.config.labels.x_txt, this.img_width / 2, bottom_y);

            this.ctx.save();
            this.ctx.translate(this.rect.x - this.config.labels.margin_right, this.img_height / 2);
            this.ctx.rotate(-Math.PI / 2);
            this.ctx.fillText(this.config.labels.y_txt, 0, 0);
            this.ctx.restore();
        });
    }

    drawFitLines() {

    }

    drawDataSets() {
        this.data_sets.forEach(data_set => {
            this.ctx.fillStyle = data_set.points_color;
            data_set.points.forEach(point => {
                let converted_p_coord = this.realToGraphCoordinates(point);
                this.ctx.beginPath();
                this.ctx.arc(converted_p_coord[0], converted_p_coord[1], data_set.points_size, 0, 2 * Math.PI);
                this.ctx.fill();
            });
        });
    }

    createDataSet() {
        this.data_sets.push(new Dataset());
    }

    updateDataSet(id, points) {
        this.data_sets[id].update(points);
        this.render();
    }

    updateDatasetSettings(id, settings) {
        this.data_sets[id].setSettings(settings);
        this.render();
    }

    resize(width, height) {
        this.canvas.resize(this.img_width, this.img_height, width, height);
        this.render();
    }

    setSettings(editor) {
        fetch(defjson)
        .then(r => r.json())
        .then(data => {
            merge(this, data);
            editor.updateSettingsInputs(data);
            this.render();
        });
    }

    updateSettings(settings) {
        merge(this, settings);
        // this.resize();
    }
}

function merge(graph, settings) {
    for (const key in settings) {
        if(typeof graph[key] === 'object' && !Array.isArray(settings[key])) {
            merge(graph[key], settings[key]);
        } else {
            graph[key] = settings[key];
        }
    }
}

function decimalPlaces(n) {
  const str = n.toString();

  if (str.includes('.')) {
    return str.split('.')[1].length;
  }

  if (str.includes('e')) {
    const [base, exp] = str.split('e').map(Number);
    const decimalPart = base.toString().split('.')[1];
    if (decimalPart) {
      return Math.max(0, decimalPart.length - exp);
    }
    return 0;
  }

  return 0; 
}