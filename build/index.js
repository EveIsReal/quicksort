var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import inquirer from "inquirer";
(() => __awaiter(void 0, void 0, void 0, function* () {
    const quickSort = (arr) => __awaiter(void 0, void 0, void 0, function* () {
        if (arr.length <= 1)
            return arr;
        let pivot = arr[0];
        let left = arr.filter(x => x < pivot);
        let right = arr.filter(x => x > pivot);
        return [...yield quickSort(left), pivot, ...yield quickSort(right)];
    });
    const rdmArray = (n, limit) => {
        const arr = [];
        for (let i = 1; i < n; i++) {
            let num;
            do {
                num = Math.round(Math.random() * limit) + 1;
            } while (arr.find(x => x === num));
            arr.push(num);
        }
        return arr;
    };
    const execute = (n, numberLimit, print) => {
        let a = Date.now();
        console.log(`Sorting array with ${n} elements with QuickSort...`);
        const arr = quickSort(rdmArray(n, n))
            .then(r => {
            let deltaT = Date.now() - a;
            if (deltaT >= 1000) {
                deltaT /= 1000;
                if (print)
                    console.log(arr);
                console.log(`Done! This took ${chalk.yellow(`${deltaT}s`)}`);
            }
            else {
                if (print)
                    console.log(arr);
                console.log(`${chalk.green("Fertig!")} Dauer: ${chalk.yellow(`${deltaT}ms`)}`);
            }
        });
    };
    const sizePrompt = yield inquirer.prompt({
        name: "size",
        message: "Wie viele Elemente soll die Menge haben?",
        default: 100,
    });
    const limitPrompt = yield inquirer.prompt({
        name: "limit",
        message: "Welchen Wert soll die großtmögliche Zufallszahl haben?",
        default: sizePrompt.size,
    });
    execute(sizePrompt.size, limitPrompt.limit, process.env.npm_config_devMode == "true" ? true : false);
}));
