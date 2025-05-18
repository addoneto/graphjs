import { points00, points01, points02  } from "./testpoints.js";

class Graph {
    constructor(posX, posY, w, h) {
        this.posX = posX;
        this.posY = posY;
        this.width = w;
        this.height = h

        this.points = points00;

        this.labelDecimals = 2;

        this.graphInfo = {
            title: "Título do gráfico",
            xlabel: "Label X",
            ylabel: "Label Y"
        }
    }

    update(ctx, points, info) {
        console.log(points);
        this.points = points;
        this.graphInfo.xlabel = info.xlabel;
        this.graphInfo.ylabel = info.ylabel;
        this.render(ctx);
    }

    render(ctx) {
        this.getFramingBoundaries();
        this.debugFrame();

        this.drawAxis(ctx);

        this.drawLabels(ctx);

        ctx.fillStyle = "rgb(142, 142, 147)";
        ctx.font = "30px CM";

        this.drawGrid(ctx);

        ctx.fillStyle = "rgb(10, 132,255)";

        this.drawPoints(ctx);
    }

    drawAxis(ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, this.width + this.posX + 100, this.height + this.posY + 100);

        ctx.beginPath();
        ctx.moveTo(this.posX, this.posY);
        ctx.lineTo(this.posX, this.posY + this.height);
        ctx.lineTo(this.posX + this.width, this.posY + this.height);
        ctx.stroke();
    }

    drawLabels(ctx) {
        ctx.fillStyle = "rgb(38, 38, 41)";
        ctx.font = "60px CM-Bold";
        
        ctx.textAlign = "center";
        ctx.fillText(this.graphInfo.title, (this.width/2) + this.posX, this.posY - 20);

        ctx.font = "40px CM";

        ctx.fillText(this.graphInfo.xlabel, (this.width/2) + this.posX, this.posY + this.height + 50);

        ctx.save();
        ctx.translate(this.posX - 80, (this.height/2) + this.posY);
        ctx.rotate(-Math.PI/2);
        ctx.fillText(this.graphInfo.ylabel, 0, 0);
        ctx.restore();
    }

    debugFrame() {
        console.log("X max: " + this.max_x + " | " + "X frame max: " + this.frameXmax);
        console.log("X min: " + this.min_x + " | " + "X frame min: " + this.frameXmin);
        console.log("X avg order: 10^" + this.xavg_magnitude + " = " + this.xavg_order);
        console.log("__________________________");
        console.log("Y max: " + this.max_y + " | " + "Y frame max: " + this.frameYmax);
        console.log("Y min: " + this.min_y + " | " + "Y frame min: " + this.frameYmin);
        console.log("Y avg order: 10^" + this.yavg_magnitude + " = " + this.yavg_order);
    }

    getFramingBoundaries() {
        this.sortPoitns();

        this.max_y = this.points[0][1];
        this.min_y = this.points[0][1];

        let yavg = 0;
        let xavg = 0;

        for(let i = 0; i < this.points.length; i++) {
            if(this.points[i][1] > this.max_y) {
                this.max_y = this.points[i][1];
            } else if(this.points[i][1] < this.min_y) {
                this.min_y = this.points[i][1];
            }
        
            if (i > 0) {
                yavg += (this.points[i][1] - this.points[i-1][1]);
                xavg += (this.points[i][0] - this.points[i-1][0]);
            }   
        }   

        xavg = xavg / this.points.length;
        yavg = yavg / this.points.length

        this.yavg_magnitude = Math.round(Math.log10(yavg));
        this.yavg_order = Math.pow(10, this.yavg_magnitude);
        this.frameYmax = round(this.max_y, this.yavg_magnitude);
        this.frameYmin = round(this.min_y, this.yavg_magnitude, false);

        this.max_x = this.points[this.points.length - 1][0];
        this.min_x = this.points[0][0];

        this.xavg_magnitude = Math.round(Math.log10(xavg));
        this.xavg_order = Math.pow(10, this.xavg_magnitude);
        this.frameXmax = round(this.max_x, this.xavg_magnitude);
        this.frameXmin = round(this.min_x, this.xavg_magnitude, false);
    }

    // quick sort
    sortPoitns() {
        pointsQuickSort(this.points, 0, this.points.length - 1);
    }

    drawGrid(ctx){
        let nx = this.frameXmax - this.frameXmin;
        nx = nx / this.xavg_order;

        this.xTileWidth = this.width / nx;

        console.log(nx);
        console.log(this.xTileWidth);

        for(let i = 0; i <= nx; i++){
            let xpos = i * this.xTileWidth;
            let label = this.frameXmin + i * this.xavg_order;

            ctx.moveTo(this.posX + xpos, this.posY + this.height);
            ctx.lineTo(this.posX + xpos, this.posY);
            ctx.stroke();

            label = label.toString();
            ctx.fillText(label, this.posX + xpos, this.posY + this.height + 20);
        }

        let ny = this.frameYmax - this.frameYmin;
        ny = ny / this.yavg_order;

        this.yTileWidth = this.height / ny;

        console.log(ny);
        console.log(this.yTileWidth);

        ctx.textAlign = "right";

        for(let i = 0; i <= ny; i++) {
            let ypos = i * this.yTileWidth;
            let label = this.frameYmin + i * this.yavg_order;

            ctx.moveTo(this.posX, this.posY + this.height - ypos);
            ctx.lineTo(this.posX + this.width, this.posY + this.height - ypos);
            ctx.stroke();

            label = label.toString();
            ctx.fillText(label, this.posX - 10, this.posY + this.height - ypos);
        }
    }

    drawPoints(ctx){
        for(let j = 0; j < this.points.length; j++){
            let realx = this.points[j][0];
            let realy = this.points[j][1];

            let cx = realx - this.frameXmin;
            let cy = realy - this.frameYmin;

            cx = cx * (this.width / (this.frameXmax - this.frameXmin) );
            cy = cy * (this.height / (this.frameYmax - this.frameYmin) );

            ctx.beginPath();
            ctx.arc(cx + this.posX, this.height + this.posY - cy, 7, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

function round(n, order, up = true) {
    let x = n;

    // if((up && x === Math.pow(10, order + 1)) || (!up && x === Math.pow(10, order - 1))) {    
    //     return x;
    // } 
    
    x = up ? x + Math.pow(10, order) : x - Math.pow(10, order);
    x -= x % Math.pow(10, order);

    return x;
}

function pointsQuickSort(arr, left, right) {
    if (left < right) {
        let pivot = pointPartition(arr, left, right);
        pointsQuickSort(arr, left, pivot-1);
        pointsQuickSort(arr, pivot+1, right);
    }
}

function pointPartition(arr, left, right) {
    let pivot = arr[right][0]; 
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (arr[j][0] <= pivot) {
            i += 1;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    let temp = arr[i+1];
    arr[i+1] = arr[right];
    arr[right] = temp;
    return i+1
}

export { Graph };