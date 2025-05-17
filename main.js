import { Graph } from "./graph.js"
import { Canvas } from "./canvas.js"

let graph = new Graph(150, 150, 1000, 700);
let canvas = new Canvas("canvas-container", 1500, 1000, 0, 0, 2);

window.onload = () => {
    canvas.create();
    graph.render(canvas.ctx);
}

const table = document.getElementById("data-table");

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
                document.getElementById("error").innerHTML = "Ocorreu um erro ao colar os dados.";
                document.getElementById("log").innerHTML = "Texto colado: " + text;
                document.getElementById("error").classList.add("show");
                return;
            }

            points.push([columns[0], columns[1]]);
            if(i>0) {
                graphpoints.push([Number(columns[0]), Number(columns[1])]);
            }
        }
        document.getElementById("error").classList.remove("show");

        console.log(points);
        updateTable(points);

        let info = {
            xlabel : points[0][0],
            ylabel : points[0][1],
        }

        graph.update(canvas.ctx, graphpoints, info);
    })
});

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