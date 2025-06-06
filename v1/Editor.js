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

                        <div class="data-set-hold">
                            <button class="clipboard-btn">
                                <svg data-slot="icon" fill="none" stroke-width="1" stroke="currentColor"
                                    viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z">
                                    </path>
                                </svg>
                            </button>
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
                        <input type="text" value="Título do Gráfico">
                    </div>
                    
                    <div class="config-wrapper">
                        <label>Cor do texto</label>
                        <input type="color">
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho do texto</label>
                        <input type="number" value="50">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Margem inferior</label>
                        <input type="number" value="30">
                        <label class="unit">[px]</label>
                    </div>

                    <h3>Eixos</h3>
                    <div class="config-wrapper">
                        <label>Eixo X</label>
                        <input type="text" value="Eixo X">
                    </div>

                    <div class="config-wrapper">
                        <label>Eixo Y</label>
                        <input type="text" value="Eixo Y">
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho do texto</label>
                        <input type="number" value="25">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Margem superior</label>
                        <input type="number" value="35">
                        <label class="unit">[px]</label>
                    </div>

                    <div class="config-wrapper">
                        <label>Margem lateral</label>
                        <input type="number" value="35">
                        <label class="unit">[px]</label>
                    </div>

                    <h3>Dimensões</h3>
                    <div class="config-wrapper">
                        <label>Tamanho da Imagem</label><br>
                        <input type="number" value="2000">
                        <label>x</label>
                        <input type="number" value="1150">
                        <label class="unit">[px]</label>
                    </div>

                    <h3>Geral</h3>
                    <div class="config-wrapper">
                        <label>Cor de fundo</label>
                        <input type="color"> <br>
                    </div>

                    <div class="config-wrapper">
                        <label>Cor dos eixos</label>
                        <input type="color"> <br>
                    </div>

                    <div class="config-wrapper">
                        <label>Cor da grade</label>
                        <input type="color"> <br>
                    </div>


                    <h3>Coordenadas</h3>
                    <div class="config-wrapper">
                        <label>Casas decimais</label>
                        <input type="number" value="2">
                    </div>

                    <div class="config-wrapper">
                        <label>Cor do texto</label>
                        <input type="color"> <br>
                    </div>

                    <div class="config-wrapper">
                        <label>Tamanho do texto</label>
                        <input type="number" value="25">
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

        this.canvas = null;

        this.primary_editor = null;
        this.settings_editor = null;

        this.create(parent, n);
    }

    create(parent, n) {
        let section_wrapper = document.createElement("div");
        section_wrapper.classList.add("section-wrapper");

        section_wrapper.innerHTML += html.replace(/\{\}/g, n.toString());
        parent.appendChild(section_wrapper);

        let canvas_container = document.getElementById(`graph-container-${n}`);
        this.canvas = new Canvas(canvas_container, 2000, 1150, 2);
        this.graph = new Graph();

        this.graph.render(this.canvas.ctx);

        this.settings_btn = document.getElementById(`settings-btn-${n}`);
        this.primary_editor = document.getElementById(`primary-editor-${n}`);
        this.settings_editor = document.getElementById(`settings-editor-${n}`);
        this.settings_btn.addEventListener("click", () => { Editor.toggleSettings(this) });
    }

    static toggleSettings(editor){
        editor.showing_settings = !editor.showing_settings;
        editor.settings_btn.children[0].classList.toggle("none");
        editor.settings_btn.children[1].classList.toggle("none");
        editor.settings_editor.classList.toggle("none");
        editor.primary_editor.classList.toggle("none");
        // console.log(editor.id);
    }
}
