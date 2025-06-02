import { Graph } from "./graph.js"
import { Canvas } from "./canvas.js"
import { points00 } from "./testpoints.js"

let graph = new Graph(150, 150, 1780, 1000);
let canvas = new Canvas("cgraph", 2000, 1300, 0, 0, 2);

window.onload = () => {
    canvas.create();
    let line = graph.render(canvas.ctx);
    updateRegressionData(line);

    let arr = points00.slice();
    arr.unshift(["Eixo X","Eixo Y"]);
    updateTable(arr);
}

const table = document.getElementById("data-table");

const input_title = document.getElementById("title");
const input_xaxis = document.getElementById("xaxis");
const input_yaxis = document.getElementById("yaxis");

const regressionData = document.getElementById("regression-data");

document.getElementById("savegraph").addEventListener("click", () => {
    let link = document.createElement('a');
    link.download = 'filename.png';
    link.href = canvas.e.toDataURL();
    link.click();
});

document.getElementById("clipboard-paste").addEventListener("click", () => {
    navigator.clipboard.readText().then(text => {
        let points = [];
        let graphpoints = [];
        let rows = text.split("\n");
        for(let i = 0; i < rows.length; i++) {
            let columns = rows[i].split("\t");
            if(columns.length != 2) {
                // show error
                document.getElementById("error-container").children[0].innerHTML = "Ocorreu um erro ao colar os dados.";
                //document.getElementById("log").innerHTML = "Texto colado: " + text;
                document.getElementById("error-container").children[0].classList.add("show");
                setTimeout(() => {
                    document.getElementById("error-container").children[0].classList.remove("show");
                }, "1000");
                return;
            }

            points.push([columns[0], columns[1]]);
            if(i>0) {
                graphpoints.push([
                    Number(columns[0].replace(",",".")),
                    Number(columns[1].replace(",",".")) 
                ]);
            }
        }
        document.getElementById("error-container").children[0].classList.remove("show");

        console.log(points);
        updateTable(points);

        let info = {
            xlabel : points[0][0],
            ylabel : points[0][1],
        }

        input_xaxis.value = info.xlabel;
        input_yaxis.value = info.ylabel;

        let line = graph.update(canvas.ctx, graphpoints, info);
        updateRegressionData(line);
    })
});

function updateRegressionData(line){
    regressionData.children[0].innerHTML = "<b>a:</b> " + line[0].toFixed(5);
    regressionData.children[2].innerHTML = "<b>b:</b> " + line[1].toFixed(5);
}

function updateTable(arr){
    table.children[0].children[0].children[0].innerHTML = arr[0][0];
    table.children[0].children[0].children[1].innerHTML = arr[0][1];

    for(let i = 0; i < arr.length - 1; i++) {
        if(!table.children[1].children[i]) {
            let tr = document.createElement("tr");
            table.children[1].appendChild(tr);
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            tr.appendChild(td1);
            tr.appendChild(td2);
        }

        table.children[1].children[i].children[0].innerHTML = arr[i + 1][0];
        table.children[1].children[i].children[1].innerHTML = arr[i + 1][1];
    }
}
let config = false;

document.getElementById("configbtn").addEventListener("click", () => {
    document.getElementById("config-panel").style.display = "flex";
    config = true;
});

document.getElementById("config-panel").addEventListener("click", e => {
    let p = document.getElementById("config-panel").children[0].getBoundingClientRect();
    if(e.clientX < p.x || e.clientY > p.right || e.clientY < p.y || e.clientY > p.bottom) {
        closeConfiguration();
    }
});

window.addEventListener("keypress", function(e) {
  if (e.key === "Enter" && config === true) {   
    closeConfiguration();
  }
});


function closeConfiguration() {
    
    document.getElementById("config-panel").style.display = "none";

    table.children[0].children[0].children[0].innerHTML = input_xaxis.value;
    table.children[0].children[0].children[1].innerHTML = input_yaxis.value;

    let info = {
        title: input_title.value,
        xlabel: input_xaxis.value,
        ylabel: input_yaxis.value,
    }

    let line = graph.update(canvas.ctx, null, info);
    updateRegressionData(line);

    config = false;
}