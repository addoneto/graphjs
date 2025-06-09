import Editor from "./Editor.js";

let ngraph = 0;

const create_graph_btn = document.getElementById("create-graph");
const main = document.getElementsByTagName("main")[0];

create_graph_btn.addEventListener("click", createNewGraph);
let editors = [];

function createNewGraph() {
    ngraph += 1;

    editors.push(new Editor(main, ngraph));
}

window.addEventListener("resize", () => {
    editors.forEach(editor => {
        editor.resize();
    });
});