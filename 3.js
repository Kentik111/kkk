const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Функция для поиска максимального элемента в столбце
function findMax(a, column, start, n) {
    let maxIndex = start;
    for (let i = start + 1; i < n; i++) {
        if (Math.abs(a[i][column]) > Math.abs(a[maxIndex][column])) {
            maxIndex = i;
        }
    }
    return maxIndex;
}

// Функция для обмена строк в двумерном массиве a и соответствующих элементов массива b
function swapRows(a, b, row1, row2) {
    let temp = a[row1];
    a[row1] = a[row2];
    a[row2] = temp;

    let tempB = b[row1];
    b[row1] = b[row2];
    b[row2] = tempB;
}

// Функция для решения системы методом Гаусса с выбором главного элемента по столбцу
function gaus(a, b, n) {
    let x = new Array(n).fill(0);

    for (let k = 0; k < n; k++) {
        let maxIndex = findMax(a, k, k, n);

        if (maxIndex !== k) {
            swapRows(a, b, k, maxIndex);
        }

        if (Math.abs(a[k][k]) < 1e-9) {
            console.log("Матрица вырождена!");
            return x;
        }

        for (let i = k + 1; i < n; i++) {
            let factor = a[i][k] / a[k][k];
            for (let j = k; j < n; j++) {
                a[i][j] -= factor * a[k][j];
            }
            b[i] -= factor * b[k];
        }
    }

    for (let i = n - 1; i >= 0; i--) {
        x[i] = b[i];
        for (let j = i + 1; j < n; j++) {
            x[i] -= a[i][j] * x[j];
        }
        x[i] /= a[i][i];
    }
    return x;
}

// Функция для решения системы методом простых итераций
function simpleIteration(a, b, x, maxIterations, eps) {
    let n = a.length;
    for (let iter = 0; iter < maxIterations; iter++) {
        let x_new = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            let sum = b[i];
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    sum -= a[i][j] * x[j];
                }
            }
            x_new[i] = sum / a[i][i];
        }

        let norm = 0.0;
        for (let i = 0; i < n; i++) {
            norm += (x_new[i] - x[i]) * (x_new[i] - x[i]);
        }
        norm = Math.sqrt(norm);
        if (norm < eps) {
            x = x_new;
            break;
        }

        x = x_new;
    }
    return x;
}

let n = 4;
let A = [
    [0.87, -0.04, 0.21, -18.0],
    [0.25, -1.23, 0.12, -0.09],
    [-0.21, 0.12, 0.8, -0.13],
    [0.15, -1.31, 0.06, 1.08]
];
let B = [-1.24, 1.08, 2.56, 0.87];

let x = gaus(A, B, n);

console.log("Результаты методом Гауса:");
for (let i = 0; i < n; i++) {
    console.log(`x${i + 1} = ${x[i].toFixed(3)}`);
}

let maxIterations = 100;
let eps = 1e-6;
x = simpleIteration(A, B, x, maxIterations, eps);

console.log("Результаты методом простых итераций:");
for (let i = 0; i < n; i++) {
    console.log(`x${i + 1} = ${x[i].toFixed(3)}`);
}
console.log(`eps = ${eps}`);

rl.close();
