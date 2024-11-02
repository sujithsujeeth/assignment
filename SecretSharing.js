const fs = require('fs');

function decodeValue(value, base) {
    return parseInt(value, base);
}

function lagrangeInterpolation(points) {
    let c = 0;
    for (let i = 0; i < points.length; i++) {
        let [xi, yi] = points[i];
        let term = yi;

        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let [xj] = points[j];
                term *= (0 - xj) / (xi - xj);
            }
        }
        c += term;
    }
    return Math.round(c);
}

function findConstantTerm(input) {
    const { n, k } = input.keys;
    const points = [];

    for (let key in input) {
        if (key === 'keys') continue;

        const x = parseInt(key);
        const base = parseInt(input[key].base);
        const yEncoded = input[key].value;
        const y = decodeValue(yEncoded, base);

        points.push([x, y]);
    }

    points.sort((a, b) => a[0] - b[0]);

    const requiredPoints = points.slice(0, k);
    return lagrangeInterpolation(requiredPoints);
}

function main() {
    const testCase1 = JSON.parse(fs.readFileSync('testcase1.json', 'utf8'));
    const testCase2 = JSON.parse(fs.readFileSync('testcase2.json', 'utf8'));

    const secret1 = findConstantTerm(testCase1);
    const secret2 = findConstantTerm(testCase2);

    console.log("Secret for test case 1:", secret1);
    console.log("Secret for test case 2:", secret2);
}

main();
