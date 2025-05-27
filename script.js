const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const customTipInput = document.getElementById("custom");
const tipButtons = document.querySelectorAll(".tip-button");
const tipAmountDisplay = document.getElementById("tip-amount");
const totalDisplay = document.getElementById("total");
const resetButton = document.getElementById("btn-reset");
const alertMessage = document.querySelector(".alert");

let billValue = 0;
let peopleValue = 0;
let tipValue = 0;

alertMessage.style.display = "none";

billInput.addEventListener("input", () => {
  billValue = parseFloat(billInput.value);
  if (isNaN(billValue) || billValue < 0) billValue = 0;
  calculateTip();
});

peopleInput.addEventListener("input", () => {
  const val = peopleInput.value.trim();

  if (val === "") {
    alertMessage.style.display = "none";
    peopleInput.classList.remove("input-error");
    peopleValue = 0;
  } else {
    peopleValue = parseInt(val, 10);

    if (isNaN(peopleValue) || peopleValue <= 0) {
      alertMessage.style.display = "block";
      peopleInput.classList.add("input-error");
    } else {
      alertMessage.style.display = "none";
      peopleInput.classList.remove("input-error");
    }
  }
  calculateTip();
});

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipValue = parseFloat(button.innerHTML) / 100;
    customTipInput.value = "";

    tipButtons.forEach((btn) => btn.classList.remove("active"));
    customTipInput.classList.remove("active");

    button.classList.add("active");

    calculateTip();
  });
});

customTipInput.addEventListener("input", () => {
  const customValue = parseFloat(customTipInput.value);
  if (!isNaN(customValue) && customValue >= 0) {
    tipValue = customValue / 100;

    tipButtons.forEach((btn) => btn.classList.remove("active"));
    customTipInput.classList.add("active");

    calculateTip();
  } else if (customTipInput.value.trim() === "") {
    tipValue = 0;
    customTipInput.classList.remove("active");
    calculateTip();
  }
});

customTipInput.addEventListener("click", () => {
  tipButtons.forEach((btn) => btn.classList.remove("active"));
  customTipInput.classList.add("active");
});

document.addEventListener("click", (event) => {
  const isTipButton = event.target.classList.contains("tip-button");
  const isCustomInput = event.target === customTipInput;

  if (!isTipButton && !isCustomInput) {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    if (document.activeElement !== customTipInput) {
      customTipInput.classList.remove("active");
    }
  }
});

function calculateTip() {
  if (billValue > 0 && peopleValue > 0) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let totalAmount = (billValue + billValue * tipValue) / peopleValue;

    tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
    totalDisplay.textContent = `$${totalAmount.toFixed(2)}`;
  } else {
    tipAmountDisplay.textContent = "$0.00";
    totalDisplay.textContent = "$0.00";
  }
}

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipAmountDisplay.textContent = "$0.00";
  totalDisplay.textContent = "$0.00";
  alertMessage.style.display = "none";
  peopleInput.classList.remove("input-error");
  billValue = 0;
  peopleValue = 0;
  tipValue = 0;

  tipButtons.forEach((btn) => btn.classList.remove("active"));
  customTipInput.classList.remove("active");
});
