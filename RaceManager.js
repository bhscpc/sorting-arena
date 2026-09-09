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
        this.leftCompetitor = left;
        this.rightCompetitor = right;
        this.startTime = Date.now();
    }
    startRace() {
        return __awaiter(this, void 0, void 0, function* () {
            document.getElementById("cover").classList.add("running");
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
            if (leftTime < rightTime) {
                alert(`Left competitor finished first in ${leftTime}ms. Right competitor took ${rightTime}ms.`);
            }
            else if (rightTime < leftTime) {
                alert(`Right competitor finished first in ${rightTime}ms. Left competitor took ${leftTime}ms.`);
            }
            else {
                alert(`They somehow tied at ${leftTime}ms!`);
            }
            document.getElementById("cover").classList.remove("running");
        });
    }
}
//# sourceMappingURL=RaceManager.js.map