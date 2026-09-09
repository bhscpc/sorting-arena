function fillSlot1() {
    document.getElementById("slot1").classList.add("filled");
}
function fillSlot2() {
    document.getElementById("slot2").classList.add("filled");
}
function clearSlot1() {
    document.getElementById("slot1").classList.remove("filled");
}
function clearSlot2() {
    document.getElementById("slot2").classList.remove("filled");
}
function clearAllSlots() {
    clearSlot1();
    clearSlot2();
}
function resetButton() {
    const resetBtn = document.getElementById("resetButton");
    resetBtn.addEventListener("click", () => {
        clearAllSlots();
    });
}
resetButton();
export {};
//# sourceMappingURL=main.js.map