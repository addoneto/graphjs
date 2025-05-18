import { Graph } from "./graph.js"
import { Canvas } from "./canvas.js"
import { points00 } from "./testpoints.js"

let graph = new Graph(150, 150, 1920, 1080);
let canvas = new Canvas("graph", 2200, 1400, 0, 0, 2);

window.onload = () => {
    canvas.create();
    graph.render(canvas.ctx);

    let arr = points00;
    arr.unshift(["Eixo X","Eixo Y"]);
    updateTable(arr);
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
                document.getElementById("error-container").children[0].innerHTML = "Ocorreu um erro ao colar os dados.";
                //document.getElementById("log").innerHTML = "Texto colado: " + text;
                document.getElementById("error-container").children[0].classList.add("show");
                setTimeout(() => {
                    document.getElementById("error-container").children[0].classList.remove("show");
                }, "10000");
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
let config = false;

document.getElementById("configbtn").addEventListener("click", () => {
    document.getElementById("config-panel").style.display = "flex";
    config = true;
});

document.getElementById("config-panel").addEventListener("click", e => {
    
    let p = document.getElementById("config-panel").children[0].getBoundingClientRect();
    if(e.clientX < p.x || e.clientY > p.right || e.clientY < p.y || e.clientY > p.bottom) {
        document.getElementById("config-panel").style.display = "none";
        
        // update graph data

        config = false;
    }
});