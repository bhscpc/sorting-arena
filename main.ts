function resetButton(): void {
    const resetBtn = document.getElementById("resetButton") as HTMLButtonElement;
    resetBtn.addEventListener("click", () => {
        clearAllSlots();
    });
}

function manageInputs() {
    const competitor1 = document.getElementById("competitor1") as HTMLInputElement;
    const competitor2 = document.getElementById("competitor2") as HTMLInputElement;
    const arraySize = document.getElementById("arraySize") as HTMLInputElement;
    const speed = document.getElementById("speed") as HTMLInputElement;
    

    competitor1.addEventListener("input", () => {
        if (competitor1.value.trim() !== "") {
            fillSlot1();
        } else {
            clearSlot1();
        }
    });
}

resetButton();