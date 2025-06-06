import Canvas from "./Canvas.js";
import Graph from "./Graph.js"

const body = document.body;
const canvas = new Canvas(body, 2000, 1150, 2);
const graph = new Graph();

window.addEventListener("load", () => {
    graph.render(canvas.ctx);
});