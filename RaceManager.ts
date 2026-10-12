import * as Alg from "./algorithms.js";

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
        alert(`${localStorage.getItem("speed")}`)
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

        const results: HTMLElement = document.getElementById("results")!;

        const winnerSide: HTMLElement = document.getElementById("winner-side")!;
        const winnerName: HTMLElement = document.getElementById("winner-name")!;
        const competitor1Time: HTMLElement = document.getElementById("finish-time-holder-1")!;
        const competitor2Time: HTMLElement = document.getElementById("finish-time-holder-2")!;
        const competitor1Name: HTMLElement = document.getElementById("algorithm-name-1")!;
        const competitor2Name: HTMLElement = document.getElementById("algorithm-name-2")!;
        competitor1Time.innerText = `${leftTime! / 1000} seconds`;
        competitor2Time.innerText = `${rightTime! / 1000} seconds`;
        competitor1Name.innerText = this.leftCompetitor.name;
        competitor2Name.innerText = this.rightCompetitor.name;

        if (leftTime! < rightTime!) {
            //alert(`Left competitor finished first in ${leftTime}ms. Right competitor took ${rightTime}ms.`);
            winnerSide.innerText = "Left";
            winnerName.innerText = this.leftCompetitor.name;
        } else {
            //alert(`Right competitor finished first in ${rightTime}ms. Left competitor took ${leftTime}ms.`);
            winnerSide.innerText = "Right";
            winnerName.innerText = this.rightCompetitor.name;
        }
        results.classList.add("show");
        this.isRacing = false;
    }
}   