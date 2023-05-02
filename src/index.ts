import chalk from "chalk";
import inquirer from "inquirer";

const quickSort = async (arr: number[]): Promise<number[]> => {
    if(arr.length <= 1) return arr;
    let pivot = arr[0];
    let left = arr.filter(x => x < pivot);
    let right = arr.filter(x => x > pivot);
    return [...await quickSort(left), pivot, ... await quickSort(right)];
}

const rdmArray = (n: number, limit: number) => {
    const arr = [];
    for(let i = 1; i < n; i++) {
        let num: number;
        do {
            num = Math.round(Math.random() * limit) +1;
        } while(arr.find(x => x === num));
        arr.push(num);
    }
    
    return arr;
}

const execute = (n: number, numberLimit: number, print?: boolean) => {
    let a = Date.now();
    console.log(`Sorting array with ${n} elements with QuickSort...`);
    const arr = quickSort(rdmArray(n, n))
    .then(r => {
        let deltaT = Date.now() - a;
        if(deltaT >= 1000) {
            deltaT /= 1000;

            if(print) console.log(arr);
            
            console.log(`Done! This took ${chalk.yellow(`${deltaT}s`)}`);
        } else {

            if(print) console.log(arr);

            console.log(`${chalk.green("Fertig!")} Dauer: ${chalk.yellow(`${deltaT}ms`)}`);
        }
        
    });
}

const sizePrompt = await inquirer.prompt({
    name: "size",
    message: "Wie viele Elemente soll die Menge haben?",
    default: 100,
});

const limitPrompt = await inquirer.prompt({
    name: "limit",
    message: "Welchen Wert soll die großtmögliche Zufallszahl haben?",
    default: sizePrompt.size,
});

execute(sizePrompt.size, limitPrompt.limit, process.env.npm_config_print == "true" ? true : false);

