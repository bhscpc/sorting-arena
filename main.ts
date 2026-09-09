import * as Alg from "./algorithms";
import { RaceManager } from "./RaceManager";

const leftCompetitors: Alg.SortingAlgorithm[] = [
    new Alg.BubbleSort(),
    new Alg.SelectionSort(),
    new Alg.InsertionSort(),
    new Alg.MergeSort(),
    new Alg.QuickSort(),
    new Alg.BogoSort(),
    new Alg.MiracleSort()
]

const rightCompetitors: Alg.SortingAlgorithm[] = [
    new Alg.BubbleSort(),
    new Alg.SelectionSort(),
    new Alg.InsertionSort(),
    new Alg.MergeSort(),
    new Alg.QuickSort(),
    new Alg.BogoSort(),
    new Alg.MiracleSort()
]

let state = "setting";

let leftCompetitor: Alg.SortingAlgorithm = leftCompetitors[0]!;
let rightCompetitor: Alg.SortingAlgorithm = rightCompetitors[0]!;



function manageInputs() {
    const competitor1 = document.getElementById("competitor1") as HTMLInputElement;
    const competitor2 = document.getElementById("competitor2") as HTMLInputElement;
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
            leftCompetitors[i]!.fisherYatesShuffle();
            rightCompetitors[i]!.fisherYatesShuffle();
        }
    });

    start.addEventListener("click", () => {
        let manager = new RaceManager(leftCompetitor, rightCompetitor);
        manager.startRace();
    });
}