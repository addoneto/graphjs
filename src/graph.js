import { points00, points01, points02,linear, noiselinear, quadratic, log, exp, horizontal, vertical } from "./testpoints.js";
import regression from "./regression.js";

class Graph {
    constructor(posX, posY, w, h) {
        this.posX = posX;
        this.posY = posY;
        this.width = w;
        this.height = h

        this.points = noiselinear;

        this.labelDecimals = 2;

        this.graphConfig = {
            title: "Título do gráfico",
            xlabel: "Eixo X",
            ylabel: "Eixo Y",
            decimal: 2,
            legend_font: 10,
        }
    }

    update(ctx, points, info) {
        if(points !== null){ 
            this.points = points;
        } 
        this.graphConfig.xlabel = info.xlabel ? info.xlabel : this.graphConfig.xlabel;
        this.graphConfig.ylabel = info.ylabel ? info.ylabel : this.graphConfig.ylabel;

        this.graphConfig.title = info.title ? info.title : this.graphConfig.title;
        return this.render(ctx);
    }

    render(ctx) {
        // console.log(points00);

        // ctx.restore();

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, this.width + this.posX + 100, this.height + this.posY + 150);

        this.getFramingBoundaries();
        this.debugFrame();

        this.drawLabels(ctx);

        ctx.font = "30px CM";

        this.drawGrid(ctx);

        this.drawAxis(ctx);

        ctx.fillStyle = "rgb(0, 0, 0)";

        this.drawPoints(ctx);

        return this.drawRegressionLine(ctx);
    }

    drawAxis(ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "rgb(0, 0, 0)";

        ctx.beginPath();
        ctx.moveTo(this.posX, this.posY);
        ctx.lineTo(this.posX, this.posY + this.height);
        ctx.lineTo(this.posX + this.width, this.posY + this.height);
        ctx.stroke();

        ctx.strokeStyle = "rgb(120, 120, 120)";

        ctx.beginPath();
        ctx.moveTo(this.posX, this.posY);
        ctx.lineTo(this.posX + this.width, this.posY);
        ctx.lineTo(this.posX + this.width, this.posY + this.height);
        ctx.stroke();
    }

    drawLabels(ctx) {
        ctx.fillStyle = "rgb(38, 38, 41)";
        ctx.font = "60px Computer-Modern-Bold";
        
        ctx.textAlign = "center";
        ctx.fillText(this.graphConfig.title, (this.width/2) + this.posX, this.posY - 30);

        ctx.font = "40px Computer-Modern";

        ctx.fillText(this.graphConfig.xlabel, (this.width/2) + this.posX, this.posY + this.height + 100);

        ctx.save();
        ctx.translate(this.posX - 100, (this.height/2) + this.posY);
        ctx.rotate(-Math.PI/2);
        ctx.fillText(this.graphConfig.ylabel, 0, 0);
        ctx.restore();
    }

    debugFrame() {
        console.log("X max: " + this.max_x + " | " + "X frame max: " + this.frameXmax);
        console.log("X min: " + this.min_x + " | " + "X frame min: " + this.frameXmin);
        console.log("X avg order: 10^" + this.xavg_dist_magnitude + " = " + this.xavg_dist_order);
        console.log("__________________________");
        console.log("Y max: " + this.max_y + " | " + "Y frame max: " + this.frameYmax);
        console.log("Y min: " + this.min_y + " | " + "Y frame min: " + this.frameYmin);
        console.log("Y avg order: 10^" + this.yavg_dist_magnitude + " = " + this.yavg_dist_order);
    }

    getFramingBoundaries() {
        this.sortPoints();

        this.max_y = this.points[0][1];
        this.min_y = this.points[0][1];

        this.xavg = 0;
        this.yavg = 0;

        let yavg_dist = 0;
        let xavg_dist = 0;

        for(let i = 0; i < this.points.length; i++) {
            this.xavg += this.points[i][0];
            this.yavg += this.points[i][1];

            if(this.points[i][1] > this.max_y) {
                this.max_y = this.points[i][1];
            } else if(this.points[i][1] < this.min_y) {
                this.min_y = this.points[i][1];
            }
        
            if (i > 0) {
                yavg_dist += (this.points[i][1] - this.points[i-1][1]);
                xavg_dist += (this.points[i][0] - this.points[i-1][0]);
            }   
        }   

        this.xavg = this.xavg / this.points.length;
        this.yavg = this.yavg / this.points.length;

        xavg_dist = Math.abs(xavg_dist / this.points.length);
        yavg_dist = Math.abs(yavg_dist / this.points.length);

        this.xavg_dist = xavg_dist;
        this.yavg_dist = yavg_dist;

        this.yavg_dist_magnitude = Math.round(Math.log10(yavg_dist));
        this.yavg_dist_order = Math.pow(10, this.yavg_dist_magnitude);
        this.frameYmax = round(this.max_y, this.yavg_dist_magnitude);
        this.frameYmin = round(this.min_y, this.yavg_dist_magnitude, false);

        this.max_x = this.points[this.points.length - 1][0];
        this.min_x = this.points[0][0];

        this.xavg_dist_magnitude = Math.round(Math.log10(xavg_dist));
        this.xavg_dist_order = Math.pow(10, this.xavg_dist_magnitude);
        this.frameXmax = round(this.max_x, this.xavg_dist_magnitude);
        this.frameXmin = round(this.min_x, this.xavg_dist_magnitude, false);
    }

    // quick sort
    sortPoints() {
        pointsQuickSort(this.points, 0, this.points.length - 1);
    }

    drawGrid(ctx){
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgb(180, 180, 180)";

        let nx = this.frameXmax - this.frameXmin;
        nx = nx / this.xavg_dist_order;

        let xmult = 1;
        if(nx > 10) {
            // ajustar proporcionalmente
            xmult = 2;
        }

        ctx.textAlign = "left";

        this.xTileWidth = this.width / nx;

        console.log(nx);
        console.log(this.xTileWidth);

        ctx.fillStyle = "rgb(150, 150, 150)";

        if (this.xavg_dist_magnitude >= 3) {
            ctx.fillText("10^" + this.xavg_dist_magnitude, this.posX + this.width, this.posY + this.height + 40);
        }

        if (this.yavg_dist_magnitude >= 3) {
            ctx.fillText("10^" + this.yavg_dist_magnitude, this.posX - 100, this.posY - 50);
        }

        ctx.fillStyle = "rgb(0, 0, 0)";

        for(let i = 0; i <= nx; i+= xmult){
            let xpos = i * this.xTileWidth;
            let label = this.frameXmin + i * this.xavg_dist_order;

            ctx.moveTo(this.posX + xpos, this.posY + this.height);
            ctx.lineTo(this.posX + xpos, this.posY);
            ctx.stroke();

            // tirar do for, criar dos loops separados
            // tirar o 3 hardcoded, permitir config
            if (this.xavg_dist_magnitude >= 3) {
                label = label / this.xavg_dist_order;
            }

            label = Number.parseFloat(label).toFixed(this.graphConfig.decimal);

            label = label.toString();
            ctx.fillText(label, this.posX + xpos - 15, this.posY + this.height + 40);
        }

        let ny = this.frameYmax - this.frameYmin;
        ny = ny / this.yavg_dist_order;

        this.yTileWidth = this.height / ny;

        console.log(ny);
        console.log(this.yTileWidth);

        ctx.textAlign = "right";

        let ymult = 1;
        if(ny > 10) {
            // ajustar proporcionalmente
            ymult = 2;
        }

        for(let i = 0; i <= ny; i+= ymult) {
            let ypos = i * this.yTileWidth;
            let label = this.frameYmin + i * this.yavg_dist_order;

            ctx.moveTo(this.posX, this.posY + this.height - ypos);
            ctx.lineTo(this.posX + this.width, this.posY + this.height - ypos);
            ctx.stroke();

            if (this.yavg_dist_magnitude >= 3) {
                label = label / this.yavg_dist_order;
            }

            label = Number.parseFloat(label).toFixed(this.graphConfig.decimal);

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

    drawRegressionLine(ctx){
        let line = regression(this.points, this.xavg, this.yavg);

        ctx.strokeStyle = "rgb(250, 150, 150)";

        let xrange = this.frameXmax - this.frameXmin;
        let xpixelConv = this.width / xrange;

        let yrange = this.frameYmax - this.frameYmin;
        let ypixelConv = this.height / yrange;

        let xm0 = (this.frameYmin - line[1])/line[0];
        let xm1 = (this.frameYmax - line[1])/line[0]
        
        console.log("...");

        console.log(xm0);
        console.log(xm1);
        console.log(xm0 <= this.frameXmin);
        console.log(xm1 >= this.frameXmax);

        console.log("...");

        if(xm0 <= this.frameXmin){ 
            let y0 = line[0] * this.frameXmin + line[1] - this.frameYmin;
            ctx.moveTo(this.posX, this.posY + this.height - (y0 * ypixelConv) );
        } else{
            xm0 -= this.frameXmin;
            ctx.moveTo(this.posX + (xm0 * xpixelConv), this.posY + this.height);
        }

        if(xm1 >= this.frameXmax) {
            let y1 = line[0] * this.frameXmax + line[1] - this.frameYmin;
            ctx.lineTo(this.posX + this.width, this.posY + this.height - (y1 * ypixelConv) );
        } else {
            xm1 -= this.frameXmin;
            ctx.lineTo(this.posX + xm1 * xpixelConv, this.posY);
        }
        
        ctx.stroke();

        ctx.strokeStyle = "rgb(0, 0, 0)";
        return line;
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