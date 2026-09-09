import * as Alg from "./algorithms.js";
import { RaceManager } from "./RaceManager.js";

const leftCompetitors: Alg.SortingAlgorithm[] = [
    new Alg.BubbleSort(true),
    new Alg.SelectionSort(true),
    new Alg.InsertionSort(true),
    new Alg.MergeSort(true),
    new Alg.QuickSort(true),
    new Alg.BogoSort(true),
    new Alg.MiracleSort(true)
]

const rightCompetitors: Alg.SortingAlgorithm[] = [
    new Alg.BubbleSort(false),
    new Alg.SelectionSort(false),
    new Alg.InsertionSort(false),
    new Alg.MergeSort(false),
    new Alg.QuickSort(false),
    new Alg.BogoSort(false),
    new Alg.MiracleSort(false)
]

let rightCanvas: HTMLCanvasElement = document.getElementById("sortingCanvas2") as HTMLCanvasElement;
let leftCanvas: HTMLCanvasElement = document.getElementById("sortingCanvas1") as HTMLCanvasElement;

let rightContext: CanvasRenderingContext2D = rightCanvas.getContext("2d")!;
let leftContext: CanvasRenderingContext2D = leftCanvas.getContext("2d")!;



let leftCompetitor: Alg.SortingAlgorithm = leftCompetitors[0]!;
let rightCompetitor: Alg.SortingAlgorithm = rightCompetitors[0]!;



function manageInputs() {
    const competitor1 = document.getElementById("algorithm1") as HTMLInputElement;
    const competitor2 = document.getElementById("algorithm2") as HTMLInputElement;
    const arraySize = document.getElementById("arraySize") as HTMLInputElement;
    const speed = document.getElementById("speed") as HTMLInputElement;
    const start = document.getElementById("startButton") as HTMLButtonElement;
    const reset = document.getElementById("resetButton") as HTMLButtonElement;

    if (
        localStorage.getItem("competitor1") == null || 
        localStorage.getItem("competitor2") == null ||
        localStorage.getItem("arraySize") == null ||
        localStorage.getItem("speed") == null
    ) {
        localStorage.setItem("competitor1", "Bubble Sort");
        localStorage.setItem("competitor2", "Bubble Sort");
        localStorage.setItem("arraySize", "50");
        localStorage.setItem("speed", "1");
        speed.value = "1";
        arraySize.value = "50";
        competitor1.value = "Bubble Sort";
        competitor2.value = "Bubble Sort";
    } else {
        speed.value = localStorage.getItem("speed") as string;
        arraySize.value = localStorage.getItem("arraySize") as string;
        competitor1.value = localStorage.getItem("competitor1") as string;
        competitor2.value = localStorage.getItem("competitor2") as string;
    }

    reset.addEventListener("click", () => {
        localStorage.setItem("competitor1", "Bubble Sort");
        localStorage.setItem("competitor2", "Bubble Sort");
        localStorage.setItem("arraySize", "50");
        localStorage.setItem("speed", "1");
        speed.value = "1";
        arraySize.value = "50";
        competitor1.value = "Bubble Sort";
        competitor2.value = "Bubble Sort";
    });

    competitor1.addEventListener("change", () => {
        localStorage.setItem("competitor1", competitor1.value);
        let name: string = competitor1.value;
        let idx = -1;
        if (name == "Bubble Sort") idx = 0;
        else if (name == "Selection Sort") idx = 1;
        else if (name == "Insertion Sort") idx = 2;
        else if (name == "Merge Sort") idx = 3;
        else if (name == "Quick Sort") idx = 4;
        else if (name == "Bogo Sort") idx = 5;
        else if (name == "Miracle Sort") idx = 6;

        leftCompetitor = leftCompetitors[idx]!;
    });

    competitor2.addEventListener("change", () => {
        localStorage.setItem("competitor2", competitor2.value);
        let name: string = competitor2.value;
        let idx = -1;
        if (name == "Bubble Sort") idx = 0;
        else if (name == "Selection Sort") idx = 1;
        else if (name == "Insertion Sort") idx = 2;
        else if (name == "Merge Sort") idx = 3;
        else if (name == "Quick Sort") idx = 4;
        else if (name == "Bogo Sort") idx = 5;
        else if (name == "Miracle Sort") idx = 6;

        rightCompetitor = rightCompetitors[idx]!;
    });

    speed.addEventListener("change", () => {
        localStorage.setItem("speed", speed.value);
        for (let i = 0; i < leftCompetitors.length; i++) {
            leftCompetitors[i]!.speed = parseInt(speed.value);
            rightCompetitors[i]!.speed = parseInt(speed.value);
        }
    });

    arraySize.addEventListener("change", () => {
        localStorage.setItem("arraySize", arraySize.value);
        for (let i = 0; i < leftCompetitors.length; i++) {
            leftCompetitors[i]!.initialize(arraySize.valueAsNumber, parseInt(speed.value));
            rightCompetitors[i]!.initialize(arraySize.valueAsNumber, parseInt(speed.value));
        }
        drawCanvas(true, leftCompetitor);
        drawCanvas(false, rightCompetitor);
    });

    start.addEventListener("click", () => {
        let name: string = competitor1.value;
        let idx = -1;
        if (name == "Bubble Sort") idx = 0;
        else if (name == "Selection Sort") idx = 1;
        else if (name == "Insertion Sort") idx = 2;
        else if (name == "Merge Sort") idx = 3;
        else if (name == "Quick Sort") idx = 4;
        else if (name == "Bogo Sort") idx = 5;
        else if (name == "Miracle Sort") idx = 6;

        leftCompetitor = leftCompetitors[idx]!;

        name = competitor2.value;
        idx = -1;
        if (name == "Bubble Sort") idx = 0;
        else if (name == "Selection Sort") idx = 1;
        else if (name == "Insertion Sort") idx = 2;
        else if (name == "Merge Sort") idx = 3;
        else if (name == "Quick Sort") idx = 4;
        else if (name == "Bogo Sort") idx = 5;
        else if (name == "Miracle Sort") idx = 6;

        rightCompetitor = rightCompetitors[idx]!;

        let manager = new RaceManager(leftCompetitor, rightCompetitor);
        manager.startRace();
    });
}


export function drawCanvas(left: Boolean, competitor: Alg.SortingAlgorithm) {
    const canvas = left ? leftCanvas : rightCanvas;
    const context = left ? leftContext : rightContext;

    const width = canvas.width;
    const height = canvas.height;
    const numBars = competitor.array.length;
    const barWidth = width / numBars;
    
    const usableHeight = height * (2/3); 

    context.clearRect(0, 0, width, height);

    if (numBars === 0) return;

    const maxVal = Math.max(...competitor.array);

    for (let i = 0; i < numBars; i++) {
        const value = competitor.array[i]!;
        const barHeight = (value / maxVal) * usableHeight;
        const x = i * barWidth;
        const y = height - barHeight;

        context.fillStyle = "#003072ff";
        context.fillRect(x, y, barWidth, barHeight);
    }
}
drawCanvas(true, leftCompetitor);
drawCanvas(false, rightCompetitor);

manageInputs();