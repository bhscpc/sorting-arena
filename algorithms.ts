export class SortingAlgorithm {
    delay: number;
    array: number[];
    speed: number;

    constructor() {
        this.delay = 0;
        this.array = [];
        this.speed = 1;
    }
    compare(a: number, b:number): number {
        this.delay += 1;
        return a - b;
    }
    rewrite(index: number, value: number): void {
        this.delay += 2;
        this.array[index] = value;
    }

    initialize(arrSize: number, speed: number): void {
        this.array = new Array(arrSize);
        for (let i = 0; i < arrSize; i++) {
            this.array[i] = i;
        }
        this.fisherYatesShuffle();
        this.speed = speed;
    }

    fisherYatesShuffle(): void {
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.array[i]!, this.array[j]!] = [this.array[j]!, this.array[i]!];
        }
    }

    start(): Promise<void> {
        return new Promise((resolve) => {
            this.sort();
            resolve();
        });
    }

    sort(): void {
    }
}

export class BubbleSort extends SortingAlgorithm {
    
}

export class SelectionSort extends SortingAlgorithm {
    
}

export class InsertionSort extends SortingAlgorithm {

}

export class MergeSort extends SortingAlgorithm {

}

export class QuickSort extends SortingAlgorithm {

}

export class BogoSort extends SortingAlgorithm {

}

export class MiracleSort extends SortingAlgorithm {

}