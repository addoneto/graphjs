import Dataset from "./Dataset.js"

const points_exp = [
    [0, 1],
    [1, 2.71828182846],
    [2, 7.38905609893],
    [3, 20.0855369232],
    [4, 54.5981500331],
    [5, 148.413159103],
    [6, 403.428793493]
];

const points_quadratic = [
    [0, 2.5],
    [0.5, 1.625],
    [1, 1],
    [1.5, 0.625],
    [2, 0.5],
    [2.5, 0.625],
    [3, 1],
    [3.5, 1.625],
    [4, 2.5],
    [4.5, 3.625],
    [5, 5],
    [6, 8.5],
    [7, 13],
    [8, 18.5],
    [10, 32.5]
];

const points_senoic = [
    [0, 0],
    [1, 1.23702],
    [2, 2.39713],
    [3, 3.40819],
    [4, 4.20735],
    [5, 4.74492],
    [6, 4.98747],
    [7, 4.91993],
    [8, 4.54649],
    [9, 4.89037],
    [10, 2.99236],
    [6.28318530718, 5],
    [12.5663706144, 0]
];

const points_mov = [
    [-37.49, 519.08],
    [-34.02, 517.17],
    [-30.50, 515.48],
    [-27.50, 513.55],
    [-24.75, 512.33],
    [-22.00, 511.02],
    [-18.95, 509.42],
    [-14.10, 506.99],
    [-9.00, 504.3],
    [-4.60, 502.27],
    [3.79, 497.68],
    [7.57, 494.93],
    [11.55, 492.02],
    [15.65, 488.99],
    [19.6, 486.14],
    [23.7, 483.02],
    [27.85, 480.24],
    [31.93, 477.08],
    [35.85, 474.3],
    [39.92, 471.83],
    [43.89, 468.55],
    [47.79, 465.21],
    [51.42, 462.56],
    [55.70, 459.55],
    [59.70, 456.17],
    [63.4, 453.65],
    [67.3, 450.33]
];

let dpoints = [
    [20050, 10],
    [17720,	9],
    [14810,	7.4],
    [8593,	4.1],
    [5166,	2.5],
    [2936,	1.5],
    [1710,	0.9],
    [716.3,	0.4]
]

const exp = new Dataset(points_exp, "#db4646");
const quadratic = new Dataset(points_quadratic, "#4693db");
const senoic = new Dataset(points_senoic, "#32a852");
const mov = new Dataset(points_mov, "#8922c9");

const density = new Dataset(dpoints, "#8922c9");

export {exp, quadratic, senoic, mov, density}