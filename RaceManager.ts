import * as Alg from "./algorithms.js";

export class RaceManager {
    leftCompetitor: Alg.SortingAlgorithm
    rightCompetitor: Alg.SortingAlgorithm
    startTime: number = 0;
    leftTime: number = 0;
    rightTime: number = 0;
    
    constructor(left: Alg.SortingAlgorithm, right: Alg.SortingAlgorithm) {
        this.leftCompetitor = left;
        this.rightCompetitor = right;
        this.startTime = Date.now();
    }

    async startRace() {
        document.getElementById("cover")!.classList.add("running");
        this.leftCompetitor.initialize(
            parseInt(localStorage.getItem("arraySize") || "50"),
            parseInt(localStorage.getItem("speed") || "1")
        );
        this.rightCompetitor.initialize(
            parseInt(localStorage.getItem("arraySize") || "50"),
            parseInt(localStorage.getItem("speed") || "1")
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
        if (leftTime! < rightTime!) {
            alert(`Left competitor finished first in ${leftTime}ms. Right competitor took ${rightTime}ms.`);
        } else if (rightTime! < leftTime!) {
            alert(`Right competitor finished first in ${rightTime}ms. Left competitor took ${leftTime}ms.`);
        } else {
            alert(`They somehow tied at ${leftTime}ms!`);
        }

        document.getElementById("cover")!.classList.remove("running");
    }
}   