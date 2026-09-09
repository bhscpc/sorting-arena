var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { drawCanvas } from "./main.js";
export class SortingAlgorithm {
    constructor(left) {
        this.delay = 0;
        this.array = [];
        this.speed = 1;
        this.left = left;
        this.initialize(50, 1);
    }
    compare(a, b) {
        return __awaiter(this, void 0, void 0, function* () {
            this.delay += 1;
            yield new Promise(resolve => setTimeout(resolve, this.speed * this.delay));
            this.delay = 0;
            return a - b;
        });
    }
    rewrite(index, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.delay += 2;
            yield new Promise(resolve => setTimeout(resolve, this.speed * this.delay));
            this.delay = 0;
            this.array[index] = value;
            drawCanvas(this.left, this);
        });
    }
    swap(index1, index2) {
        return __awaiter(this, void 0, void 0, function* () {
            let idx1Val = this.array[index1];
            let idx2Val = this.array[index2];
            yield this.rewrite(index1, idx2Val);
            yield this.rewrite(index2, idx1Val);
        });
    }
    initialize(arrSize, speed) {
        this.array = new Array(arrSize);
        for (let i = 0; i < arrSize; i++) {
            this.array[i] = i + 1;
        }
        this.fisherYatesShuffle();
        this.speed = speed;
    }
    fisherYatesShuffle() {
        for (let i = this.array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sort();
        });
    }
    sort() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
export class BubbleSort extends SortingAlgorithm {
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let n = this.array.length;
            for (let i = 0; i < n - 1; i++) {
                for (let j = 0; j < n - i - 1; j++) {
                    if ((yield this.compare(this.array[j], this.array[j + 1])) > 0) {
                        yield this.swap(j, j + 1);
                    }
                }
            }
        });
    }
}
export class SelectionSort extends SortingAlgorithm {
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let n = this.array.length;
            for (let i = 0; i < n - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < n; j++) {
                    if ((yield this.compare(this.array[j], this.array[minIndex])) < 0) {
                        minIndex = j;
                    }
                }
                if (minIndex !== i) {
                    yield this.swap(i, minIndex);
                }
            }
        });
    }
}
export class InsertionSort extends SortingAlgorithm {
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            let n = this.array.length;
            for (let i = 1; i < n; i++) {
                let key = this.array[i];
                let j = i - 1;
                for (; j >= 0 && ((yield this.compare(this.array[j], key)) > 0); j--) {
                    yield this.rewrite(j + 1, this.array[j]);
                }
                yield this.rewrite(j + 1, key);
            }
        });
    }
}
export class MergeSort extends SortingAlgorithm {
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.mergeSort(0, this.array.length - 1);
        });
    }
    mergeSort(left, right) {
        return __awaiter(this, void 0, void 0, function* () {
            if (left < right) {
                let mid = Math.floor((left + right) / 2);
                yield this.mergeSort(left, mid);
                yield this.mergeSort(mid + 1, right);
                yield this.merge(left, mid, right);
            }
        });
    }
    merge(left, mid, right) {
        return __awaiter(this, void 0, void 0, function* () {
            const temp = [];
            let i = left;
            let j = mid + 1;
            while (i <= mid && j <= right) {
                if ((yield this.compare(this.array[i], this.array[j])) <= 0) {
                    temp.push(this.array[i]);
                    i++;
                }
                else {
                    temp.push(this.array[j]);
                    j++;
                }
            }
            while (i <= mid) {
                temp.push(this.array[i]);
                i++;
            }
            while (j <= right) {
                temp.push(this.array[j]);
                j++;
            }
            for (let k = 0; k < temp.length; k++) {
                yield this.rewrite(left + k, temp[k]);
            }
        });
    }
}
export class QuickSort extends SortingAlgorithm {
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.quickSort(0, this.array.length - 1);
        });
    }
    quickSort(low, high) {
        return __awaiter(this, void 0, void 0, function* () {
            if (low < high) {
                let pivot = yield this.partition(low, high);
                yield this.quickSort(low, pivot - 1);
                yield this.quickSort(pivot + 1, high);
            }
        });
    }
    partition(low, high) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = low - 1;
            for (let j = low; j < high; j++) {
                if ((yield this.compare(this.array[j], this.array[high])) < 0) {
                    i++;
                    yield this.swap(i, j);
                }
            }
            yield this.swap(i + 1, high);
            return i + 1;
        });
    }
}
export class BogoSort extends SortingAlgorithm {
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            while (!(yield this.isSorted())) {
                for (let i = this.array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    yield this.swap(i, j);
                }
            }
        });
    }
    isSorted() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.array.length - 1; i++) {
                if ((yield this.compare(this.array[i], this.array[i + 1])) > 0) {
                    return false;
                }
            }
            return true;
        });
    }
}
export class MiracleSort extends SortingAlgorithm {
    sort() {
        return __awaiter(this, void 0, void 0, function* () {
            while (!(yield this.isSorted())) { }
        });
    }
    isSorted() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.array.length - 1; i++) {
                if ((yield this.compare(this.array[i], this.array[i + 1])) > 0) {
                    return false;
                }
            }
            return true;
        });
    }
}
//# sourceMappingURL=algorithms.js.map