class SortingAlgorithm {
    delay: number;
    array: number[];

    constructor() {
        this.delay = 0;
        this.array = [];
    }
    compare(a: number, b:number): number {
        this.delay += 1;
        return a - b;
    }
    rewrite(index: number, value: number): void {
        this.delay += 2;
        this.array[index] = value;
    }
}

class BogoSort {

}