import Canvas from "./Canvas.js";
import Graph from "./Graph.js";

let html = `
<section class="edit-container" id="graph-{}">
            <div class="param-editor">
                <div class="editor-header">
                    <h2>Gráfico {}</h2>
                    <div class="header-interactions">
                        <button id="settings-btn-{}">
                            <svg data-slot="icon" fill="none" stroke-width="1" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                            </svg>
                            <svg class="none" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                        <button>
                            <svg data-slot="icon" fill="none" stroke-width="1" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25">
                                </path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="primary-editor" id="primary-editor-{}">
                    <div class="data-sets-container">
                        <h3>Conjuntos de Dados</h3>
                        <button class="add-btn">
                            <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                            </svg>
                        </button>

                        <div class="data-set-wrapper"> 

                        </div>

                    </div>

                    <div class="fit-curves-container">
                        <h3>Curvas de Ajuste</h3>
                        <button class="add-btn">
                            <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="settings-editor none" id="settings-editor-{}">
                    <h3>Título</h3>
                    <div class="config-wrapper">
                        <input type="text" id="title-txt-{}" value="Título do Gráfico">
                    </div>
                    
                    <div class="config-wrapper">
                        <label>Cor do texto</label>
                        <input id="title-font_color-{}" type="color">
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho do texto</label>
                        <input id="title-font_size-{}" type="number" value="50">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Margem inferior</label>
                        <input id="title-margin-{}" type="number" value="30">
                        <label class="unit">[px]</label>
                    </div>

                    <h3>Eixos</h3>
                    <div class="config-wrapper">
                        <label>Eixo X</label>
                        <input id="labels-x_txt-{}" type="text" value="Eixo X">
                    </div>

                    <div class="config-wrapper">
                        <label>Eixo Y</label>
                        <input id="labels-y_txt-{}" type="text" value="Eixo Y">
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho do texto</label>
                        <input id="labels-font_size-{}" type="number" value="25">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Cor do texto</label>
                        <input id="labels-font_color-{}" type="color">
                    </div>

                    <div class="config-wrapper">
                        <label>Margem superior</label>
                        <input id="labels-margin_top-{}" type="number" value="35">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Margem lateral</label>
                        <input id="labels-margin_right-{}" type="number" value="35">
                        <label class="unit">[px]</label>
                    </div>

                    <h3>Dimensões</h3>
                    <div class="config-wrapper">
                        <label>Tamanho da Imagem</label><br>
                        <input id="_-img_width-{}" type="number" value="2000">
                        <label>x</label>
                        <input id="_-img_height-{}" type="number" value="1150">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho do Gráfico</label><br>
                        <input id="_-graph_width-{}" type="number" value="2000">
                        <label>x</label>
                        <input id="_-graph_height-{}" type="number" value="1150">
                        <label class="unit">[px]</label>
                    </div>

                    <h3>Geral</h3>
                    <div class="config-wrapper">
                        <label>Cor de fundo</label>
                        <input id="config-bg_color-{}" type="color"> <br>
                    </div>

                    <div class="config-wrapper">
                        <label>Cor dos eixos</label>
                        <input id="axis-color-{}" type="color"> <br>
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho da linha dos Eixos</label>
                        <input id="axis-line_width-{}" type="number" value="2">
                        <label class="unit">[px]</label>
                    </div>

                    <h3>Grade</h3>

                    <div class="config-wrapper">
                        <label>Cor da grade</label>
                        <input id="grid-color-{}" type="color"> <br>
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho da linha da Grade</label>
                        <input id="grid-line_width-{}" type="number" value="2">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Máximo de Divosões em X</label>
                        <input id="_-max_grid_x-{}" type="number" value="35">
                    </div>

                    <div class="config-wrapper">
                        <label>Máximo de Divosões em Y</label>
                        <input id="_-max_grid_y-{}" type="number" value="35">
                    </div>

                    <h3>Coordenadas</h3>
                    <div class="config-wrapper">
                        <label>Casas decimais</label>
                        <input id="coordinates-decimals-{}" type="number" value="2">
                    </div>

                    <div class="config-wrapper">
                        <label>Cor do texto</label>
                        <input id="coordinates-font_color-{}" type="color"> <br>
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho do texto</label>
                        <input id="coordinates-font_size-{}" type="number" value="25">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Margem inferior</label>
                        <input id="coordinates-margin_bottom-{}" type="number" value="25">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Margem lateral</label>
                        <input id="coordinates-margin_right-{}" type="number" value="25">
                        <label class="unit">[px]</label>
                    </div>

                </div>

            </div>
            <div class="graph-container" id="graph-container-{}">
            </div>
        </section>`;

export default class Editor {
    constructor(parent, n) {
        this.graph = null;
        this.showing_settings = false;
        this.id = n;
        this.settings_btn = null;
        this.element = null;

        this.canvas = null;

        this.primary_editor = null;
        this.settings_editor = null;
        this.data_set_container = null;
        this.canvas_contaner = null;

        this.data_sets = [];

        this.settings_inputs = {
            img_width: null,
            img_height: null,
            graph_width: null,
            graph_height: null,
            max_grid_x: null,
            max_grid_y: null,
            config: {
                bg_color: null,
                title: {
                    txt: null,
                    font_size: null,
                    font_color: null,
                    margin: null
                },
                labels: {
                    x_txt: null,
                    y_txt: null,
                    font_size: null,
                    font_color: null,
                    margin_top: null,
                    margin_right: null
                },
                coordinates: {
                    font_size: null,
                    font_color: null,
                    decimals: null,
                    margin_bottom: null,
                    margin_right: null
                },
                axis: {
                    color: null,
                    line_width: null
                },
                grid: {
                    color: null,
                    line_width: null
                }
            }
        };

        this.create(parent, n);
    }

    create(parent, n) {
        let section_wrapper = document.createElement("div");
        section_wrapper.classList.add("section-wrapper");

        section_wrapper.innerHTML += html.replace(/\{\}/g, n.toString());
        parent.appendChild(section_wrapper);

        this.element = section_wrapper.children[0];

        this.canvas_contaner = document.getElementById(`graph-container-${n}`);

        this.settings_btn = document.getElementById(`settings-btn-${n}`);
        this.primary_editor = document.getElementById(`primary-editor-${n}`);
        this.settings_editor = document.getElementById(`settings-editor-${n}`);
        this.settings_btn.addEventListener("click", () => { Editor.toggleSettings(this) });

        this.data_set_container = this.primary_editor.children[0];

        this.data_set_container.getElementsByClassName("add-btn")[0].addEventListener("click", () => {
            Editor.createDataSet(this);
        });

        let input_wrappers = this.settings_editor.getElementsByClassName("config-wrapper");
        for (let div of input_wrappers) {
            let inputs = div.getElementsByTagName("input");
            for (let input of inputs) {
                input.addEventListener("change", () => {
                    Editor.updateGraphSettings(this, n);
                });
            }
        }

        this.getSettingsInputs(n);

        this.canvas = new Canvas(this.canvas_contaner, 2000, 1150, 1);
        this.graph = new Graph(this.canvas, this);

        this.resize();

        Editor.createDataSet(this);
    }

    getSettingsInputs(n) {
        let stack = [{
            parent: "_",
            obj: this.settings_inputs,
            keys: Object.keys(this.settings_inputs)
        }];

        while (stack.length > 0) {
            let current = stack[stack.length - 1];

            if (current.keys.length === 0) {
                stack.pop(); // terminou este objeto
                continue;
            }

            let key = current.keys.shift();
            let value = current.obj[key];

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                stack.push({
                    parent: key,
                    obj: value,
                    keys: Object.keys(value)
                });
            } else {
                current.obj[key] = document.getElementById(`${current.parent}-${key}-${n}`);
            }
        }

        console.log(this.settings_inputs);
    }

    // checar código
    updateSettingsInputs(data) {
        console.log(data);
        let stack = [{
            objInput: this.settings_inputs,
            objData: data
        }];

        while (stack.length > 0) {
            let { objInput, objData } = stack.pop();

            for (let key in objInput) {
                const valInput = objInput[key];

                // Garante que objData é objeto antes de usar 'in'
                if (
                    typeof objData !== 'object' ||
                    objData === null ||
                    !(key in objData)
                ) continue;

                const valData = objData[key];

                if (
                    typeof valInput === 'object' && valInput !== null &&
                    typeof valData === 'object' && valData !== null &&
                    !Array.isArray(valInput) && !Array.isArray(valData)
                ) {
                    stack.push({
                        objInput: valInput,
                        objData: valData
                    });
                } else {
                    valInput.value = valData;
                }
            }

        }
    }

    static createDataSet(editor) {
        let data_set_div = document.createElement("div");
        data_set_div.classList.add("data-set");
        editor.data_set_container.getElementsByClassName("data-set-wrapper")[0].appendChild(data_set_div);

        let data_div = document.createElement("div");
        data_set_div.appendChild(data_div);

        let clipboard_btn = document.createElement("button");
        clipboard_btn.classList.add("clipboard-btn");

        data_div.appendChild(clipboard_btn);
        clipboard_btn.innerHTML += `
                                <svg data-slot="icon" fill="none" stroke-width="1" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z">
                                    </path>
                                </svg>`;

        let config_btn = document.createElement("button");
        config_btn.classList.add("dataset-config-btn");
        data_set_div.appendChild(config_btn);

        config_btn.innerHTML = `
        <svg data-slot="icon" fill="none" stroke-width="1" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z">
                                </path>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                            </svg>
                            <svg class="none" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
                            </svg>`;

        let settings_div = document.createElement("div");
        settings_div.classList.add("none");
        settings_div.classList.add("dataset-settings")
        data_set_div.appendChild(settings_div);

        settings_div.innerHTML = `
            <div class="config-wrapper">
                <label>Cor dos Pontos</label>
                <input type="color">
            </div>

            <div class="config-wrapper">
                <label>Tamanho dos Pontos</label>
                <input type="number" value="7">
                <label class="unit">[px]</label>
            </div>
        `;

        editor.data_sets.push({
            div: data_set_div,
            clipboard_btn: clipboard_btn,
            settings_panel: false,
            table: null,
            data_div: data_div,
            settings_div: settings_div,
            settings_btn: config_btn,
        });

        let id = editor.data_sets.length - 1;
        editor.graph.createDataSet();

        clipboard_btn.addEventListener("click", () => {
            Editor.pasteDataSet(editor.data_sets[id], editor, id);
        });

        config_btn.addEventListener("click", () => {
            Editor.openDatasetSettings(editor.data_sets[id], editor, id);
        });

        for (let input of settings_div.getElementsByTagName("input")) {
            input.addEventListener("change", () => {
                Editor.updateDatasetSettings(editor.data_sets[id], editor, id);
            });
        }
    }

    static pasteDataSet(data_set, editor, id) {
        let table = document.createElement("table");
        data_set.data_div.appendChild(table);

        data_set.table = table;

        let thead = document.createElement("thead");
        table.appendChild(thead);

        let htr = document.createElement("tr");
        thead.appendChild(htr);

        let xaxis = document.createElement("th");
        xaxis.innerHTML = "Eixo X";
        htr.appendChild(xaxis);

        let yaxis = document.createElement("th");
        yaxis.innerHTML = "Eixo Y";
        htr.appendChild(yaxis);

        let tbody = document.createElement("tbody");
        table.appendChild(tbody);

        let points = [];

        navigator.clipboard.readText().then(clipboard_txt => {
            // console.log(clipboard_txt);

            let rows = clipboard_txt.split("\n");
            rows.forEach(row => {
                let point = row.split("\t");
                point[0] = parseFloat(point[0].replace(",", "."));
                point[1] = parseFloat(point[1].replace(",", "."));
                points.push(point);

                let tr = document.createElement("tr");
                tbody.appendChild(tr);

                let x = document.createElement("td");
                x.setAttribute("contenteditable", "true");
                x.innerHTML = point[0];
                tr.appendChild(x);

                let y = document.createElement("td");
                y.setAttribute("contenteditable", "true");
                y.innerHTML = point[1];
                tr.appendChild(y);
            });

            // console.log(points);
            data_set.clipboard_btn.classList.add("none");
            editor.graph.updateDataSet(id, points);
        });

    }

    static openDatasetSettings(data_set, editor, id) {
        data_set.data_div.classList.toggle("none");
        data_set.settings_div.classList.toggle("none");
        data_set.settings_panel = !data_set.settings_panel;

        data_set.settings_btn.children[0].classList.toggle("none");
        data_set.settings_btn.children[1].classList.toggle("none");
    }

    static updateDatasetSettings(data_set, editor, id) {
        let settings = {
            points_color: data_set.settings_div.getElementsByTagName("input")[0].value,
            points_size: Number(data_set.settings_div.getElementsByTagName("input")[1].value),
        };
        editor.graph.updateDatasetSettings(id, settings);
    }

    static toggleSettings(editor) {
        editor.showing_settings = !editor.showing_settings;
        editor.settings_btn.children[0].classList.toggle("none");
        editor.settings_btn.children[1].classList.toggle("none");
        editor.settings_editor.classList.toggle("none");
        editor.primary_editor.classList.toggle("none");
        // console.log(editor.id);
    }

    resize() {
        let p = this.canvas_contaner.getBoundingClientRect();
        let width = p.right - p.left;
        let height = p.bottom - p.y;
        this.graph.resize(width, height);
    }

    static updateGraphSettings(editor, id) {
        let stack = [{
            inputNode: editor.settings_inputs,
            outputNode: {}
        }];

        const settings = stack[0].outputNode;

        while (stack.length > 0) {
            const { inputNode, outputNode } = stack.pop();

            for (let key in inputNode) {
                const val = inputNode[key];

                if (
                    typeof val === 'object' &&
                    val !== null &&
                    !Array.isArray(val)
                ) {
                    // Se tiver .value, considera um input real
                    if ('value' in val) {
                        outputNode[key] = val.value;
                    } else {
                        // Caso contrário, é um objeto aninhado
                        outputNode[key] = {};
                        stack.push({
                            inputNode: val,
                            outputNode: outputNode[key]
                        });
                    }
                }
            }
        }

        editor.graph.updateSettings(settings);
        editor.resize();
    }
}