import Editor from "./Editor.js";

let ngraph = 0;

const create_graph_btn = document.getElementById("create-graph");
const main = document.getElementsByTagName("main")[0];

create_graph_btn.addEventListener("click", createNewGraph);
let editors = [];

export function createNewGraph() {
    ngraph += 1;

    let n =  new Editor(main, ngraph);
    editors.push(n);
    return n;
}

window.addEventListener("resize", () => {
    editors.forEach(editor => {
        editor.resize();
    });
});

export function updateDataSet(data_set, editor, id, data){
    Editor.updateDataSet(data_set, editor, id, data);
}