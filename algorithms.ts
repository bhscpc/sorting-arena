export class SortingAlgorithm {
    delay: number;
    array: number[];
    speed: number;

    constructor() {
        this.delay = 0;
        this.array = [];
        this.speed = 1;
    }
    async compare(a: number, b:number): Promise<number> {
        this.delay += 1;
        await new Promise(resolve => setTimeout(resolve, this.speed*this.delay));
        this.delay = 0;
        return a - b;
    }
    async rewrite(index: number, value: number): Promise<void> {
        this.delay += 2;
        await new Promise(resolve => setTimeout(resolve, this.speed*this.delay));
        this.delay = 0;
        this.array[index] = value;
    }

    async swap(index1: number, index2: number): Promise<void> {
        let idx1Val = this.array[index1]!;
        let idx2Val = this.array[index2]!;
        await this.rewrite(index1, idx2Val);
        await this.rewrite(index2, idx1Val);
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

    async start(): Promise<void> {
        await this.sort();
    }

    async sort(): Promise<void> {}
}

export class BubbleSort extends SortingAlgorithm {
    async sort(): Promise<void> {
        let n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (await this.compare(this.array[j]!, this.array[j + 1]!) > 0) {
                    await this.swap(j, j + 1);
                }
            }
        }
    }
}

export class SelectionSort extends SortingAlgorithm {
    async sort(): Promise<void> {
        let n = this.array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < n; j++) {
                if (await this.compare(this.array[j]!, this.array[minIndex]!) < 0) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                await this.swap(i, minIndex);
            }
        }
    }
}

export class InsertionSort extends SortingAlgorithm {
    async sort(): Promise<void> {
        let n = this.array.length;
        for (let i = 1; i < n; i++) {
            let key = this.array[i]!;
            let j = i-1;
            for (; j >= 0 && (await this.compare(this.array[j]!, key) > 0); j--) {
                await this.rewrite(j + 1, this.array[j]!);
            }
            await this.rewrite(j + 1, key);
        }
    }
}

export class MergeSort extends SortingAlgorithm {
    async sort(): Promise<void> {
        await this.mergeSort(0, this.array.length - 1);
    }
    
    private async mergeSort(left: number, right: number): Promise<void> {
        if (left < right) {
            let mid = Math.floor((left + right) / 2);
            await this.mergeSort(left, mid);
            await this.mergeSort(mid + 1, right);
            await this.merge(left, mid, right);
        }
    }

    private async merge(left: number, mid: number, right: number): Promise<void> {
        const temp: number[] = [];
        let i = left;
        let j = mid + 1;

        while (i <= mid && j <= right) {
            if (await this.compare(this.array[i]!, this.array[j]!) <= 0) {
                temp.push(this.array[i]!);
                i++;
            } else {
                temp.push(this.array[j]!);
                j++;
            }
        }

        while (i <= mid) {
            temp.push(this.array[i]!);
            i++;
        }

        while (j <= right) {
            temp.push(this.array[j]!);
            j++;
        }

        for (let k = 0; k < temp.length; k++) {
            await this.rewrite(left + k, temp[k]!);
        }
    }
}

export class QuickSort extends SortingAlgorithm {
    async sort(): Promise<void> {
        await this.quickSort(0, this.array.length - 1);
    }

    private async quickSort(low: number, high: number): Promise<void> {
        if (low < high) {
            let pivot = await this.partition(low, high);
            await this.quickSort(low, pivot - 1);
            await this.quickSort(pivot + 1, high);
        }
    }

    private async partition(low: number, high: number): Promise<number> {
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (await this.compare(this.array[j]!, this.array[high]!) < 0) {
                i++;
                await this.swap(i, j);
            }
        }
        await this.swap(i + 1, high);
        return i + 1;
    }
}

export class BogoSort extends SortingAlgorithm {
    async sort(): Promise<void> {
        while (!(await this.isSorted())) {
            for (let i = this.array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                await this.swap(i, j);
            }
        }
    }
    private async isSorted(): Promise<boolean> {
        for (let i = 0; i < this.array.length - 1; i++) {
            if (await this.compare(this.array[i]!, this.array[i + 1]!) > 0) {
                return false;
            }
        }
        return true;
    }
}

export class MiracleSort extends SortingAlgorithm {
    async sort(): Promise<void> {
        while (!(await this.isSorted())) {}
    }
    private async isSorted(): Promise<boolean> {
        for (let i = 0; i < this.array.length - 1; i++) {
            if (await this.compare(this.array[i]!, this.array[i + 1]!) > 0) {
                return false;
            }
        }
        return true;
    }
}