export default function getRegressionLine(points, avgX, avgY) {
    console.log("avg X: " + avgX + " | avg Y: " + avgY);
    let a = 0;
    let b = 0;
    let dsum = 0;
    for(let i = 0; i < points.length; i++) {
        let x = (points[i][0] - avgX);

        a += (x * (points[i][1] - avgY));
        dsum += (x * x);
    }

    a = a / dsum;
    b = (avgY - a * avgX);

    console.log("a:" + a + " | b: " + b);
    return [a, b];
}