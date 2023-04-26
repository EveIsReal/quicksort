# Quicksort in TypeScript

```javascript
import { timeStamp } from "console";

const quickSort = async (arr: number[]): Promise<number[]> => {
    if(arr.length <= 1) return arr;
    let pivot = arr[0];
    let left = arr.filter(x => x < pivot);
    let right = arr.filter(x => x > pivot);
    return [...await quickSort(left), pivot, ... await quickSort(right)];
}

const rdmArray = (n: number, limit: number) => {
    const arr = [];
    for(let i = 0; i < n; i++) {
        let num = Math.round(Math.random() * limit);
        if(!arr.find(x => x === num)) {
            arr.push(num);
        }
    }

    return arr;
}


let a = Date.now();
let n = 123456;
console.log(`Sorting array with ${n} elements with QuickSort...`);
quickSort(rdmArray(n, n))
.then(r => {
    let deltaT = Date.now() - a;
    if(deltaT >= 1000) {
        deltaT /= 1000;
        console.log(`Done! This took ${deltaT}s`);
    } else {
        console.log(`Done! This took ${deltaT}ms`);
    }
    
});
```