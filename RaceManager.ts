import * as Alg from "./algorithms.js";

const results: HTMLElement = document.getElementById("results")!;
export class RaceManager {
    leftCompetitor: Alg.SortingAlgorithm
    rightCompetitor: Alg.SortingAlgorithm
    startTime: number = 0;
    leftTime: number = 0;
    rightTime: number = 0;
    isRacing: boolean = false;
    
    constructor(left: Alg.SortingAlgorithm, right: Alg.SortingAlgorithm) {
        this.leftCompetitor = left;
        this.rightCompetitor = right;
        this.startTime = Date.now();
    }

    setCompetitors(left: Alg.SortingAlgorithm, right: Alg.SortingAlgorithm) {
        this.leftCompetitor = left;
        this.rightCompetitor = right;
        this.startTime = Date.now();
    }

    async startRace() {
        this.isRacing = true;
        // alert(`${localStorage.getItem("speed")}`)
        this.leftCompetitor.initialize(
            parseFloat(localStorage.getItem("arraySize") || "50"),
            parseInt(localStorage.getItem("speed") || "1")
        );
        this.rightCompetitor.initialize(
            parseFloat(localStorage.getItem("arraySize") || "50"),
            parseFloat(localStorage.getItem("speed") || "1")
        );
        this.startTime = Date.now();

        let leftRacePromise = new Promise<number>((resolve) => {
            this.leftCompetitor.start().then(() => {
                this.leftTime = Date.now() - this.startTime;
                resolve(this.leftTime);
            });
        });

        let rightRacePromise = new Promise<number>((resolve) => {
            this.rightCompetitor.start().then(() => {
                this.rightTime = Date.now() - this.startTime;
                resolve(this.rightTime);
            });
        });

        const racePromises = [leftRacePromise, rightRacePromise];
        const [leftTime, rightTime] = await Promise.all(racePromises);

        
        let winnerName: string;
        let winnerLocation: string;
        let winnerNumber: number;
        let winnerTime: number;
        let loserName: string;
        let loserNumber: number;
        let loserLocation: string;
        let loserTime: number;
        let timeDiff: number = Math.abs(leftTime! - rightTime!);

        if (leftTime! < rightTime!) {
            winnerName = this.leftCompetitor.name;
            winnerLocation = "left";
            winnerNumber = 1;
            winnerTime = leftTime!;

            loserName = this.rightCompetitor.name;
            loserLocation = "right";
            loserNumber = 2;
            loserTime = rightTime!;
        } else {
            winnerName = this.rightCompetitor.name;
            winnerLocation = "right";
            winnerNumber = 2;
            winnerTime = rightTime!;

            loserName = this.leftCompetitor.name;
            loserLocation = "left";
            loserNumber = 1;
            loserTime = leftTime!;
        }

        document.getElementById("winner-name")!.textContent = winnerName;
        document.getElementById("winner-number")!.textContent = winnerNumber.toString();
        document.getElementById("winner-side")!.textContent = winnerLocation;
        document.getElementById("time")!.textContent = (winnerTime / 1000).toFixed(2);
        document.getElementById("time-faster")!.textContent = `${(timeDiff / 1000).toFixed(2)} seconds faster`;

        document.getElementById("winner-name2")!.textContent = winnerName;
        document.getElementById("winner-number2")!.textContent = winnerNumber.toString();
        document.getElementById("winner-side2")!.textContent = winnerLocation;
        document.getElementById("loser-name2")!.textContent = loserName;
        document.getElementById("loser-number2")!.textContent = loserNumber.toString();
        document.getElementById("loser-side2")!.textContent = loserLocation;

        document.getElementById("winner-seconds")!.textContent = (winnerTime / 1000).toFixed(2);
        document.getElementById("loser-seconds")!.textContent = (loserTime / 1000).toFixed(2);

        document.getElementById("percent-less")!.textContent = "Faster by";
        document.getElementById("percent-who")!.textContent =
            `${(timeDiff / loserTime * 100).toFixed(1)}%`;

        document.getElementById("winner-elapsed-time-bar")!.style.width =
            `${winnerTime / loserTime * 100}%`;
        document.getElementById("loser-elapsed-time-bar")!.style.width = "100%";

        results.classList.add("show");
        this.isRacing = false;
    }
}   

results.addEventListener("click", () => {
    results.classList.remove("show");
});