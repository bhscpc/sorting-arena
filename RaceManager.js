var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as Alg from "./algorithms.js";
export class RaceManager {
    constructor(left, right) {
        this.startTime = 0;
        this.leftTime = 0;
        this.rightTime = 0;
        this.isRacing = false;
        this.leftCompetitor = left;
        this.rightCompetitor = right;
        this.startTime = Date.now();
    }
    setCompetitors(left, right) {
        this.leftCompetitor = left;
        this.rightCompetitor = right;
        this.startTime = Date.now();
    }
    startRace() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isRacing = true;
            this.leftCompetitor.initialize(parseInt(localStorage.getItem("arraySize") || "50"), parseInt(localStorage.getItem("speed") || "1"));
            this.rightCompetitor.initialize(parseInt(localStorage.getItem("arraySize") || "50"), parseInt(localStorage.getItem("speed") || "1"));
            this.startTime = Date.now();
            let leftRacePromise = new Promise((resolve) => {
                this.leftCompetitor.start().then(() => {
                    this.leftTime = Date.now() - this.startTime;
                    resolve(this.leftTime);
                });
            });
            let rightRacePromise = new Promise((resolve) => {
                this.rightCompetitor.start().then(() => {
                    this.rightTime = Date.now() - this.startTime;
                    resolve(this.rightTime);
                });
            });
            const racePromises = [leftRacePromise, rightRacePromise];
            const [leftTime, rightTime] = yield Promise.all(racePromises);
            const results = document.getElementById("results");
            const winnerSide = document.getElementById("winner-side");
            const winnerName = document.getElementById("winner-name");
            const competitor1Time = document.getElementById("finish-time-holder-1");
            const competitor2Time = document.getElementById("finish-time-holder-2");
            const competitor1Name = document.getElementById("algorithm-name-1");
            const competitor2Name = document.getElementById("algorithm-name-2");
            competitor1Time.innerText = `${leftTime / 1000} seconds`;
            competitor2Time.innerText = `${rightTime / 1000} seconds`;
            competitor1Name.innerText = this.leftCompetitor.name;
            competitor2Name.innerText = this.rightCompetitor.name;
            if (leftTime < rightTime) {
                //alert(`Left competitor finished first in ${leftTime}ms. Right competitor took ${rightTime}ms.`);
                winnerSide.innerText = "Left";
                winnerName.innerText = this.leftCompetitor.name;
            }
            else {
                //alert(`Right competitor finished first in ${rightTime}ms. Left competitor took ${leftTime}ms.`);
                winnerSide.innerText = "Right";
                winnerName.innerText = this.rightCompetitor.name;
            }
            results.classList.add("show");
            this.isRacing = false;
        });
    }
}
//# sourceMappingURL=RaceManager.js.map