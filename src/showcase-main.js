import { createNewGraph, updateDataSet } from "./main.js";
import { density } from "./test-datasets.js";


window.addEventListener("load", () => {
    let editor = createNewGraph();
    updateDataSet(editor.data_sets[0], editor, 0, density.points);
});