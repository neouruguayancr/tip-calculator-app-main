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

billInput.addEventListener("input", () => {
  billValue = parseFloat(billInput.value);
  calculateTip();
});

peopleInput.addEventListener("input", () => {
  peopleValue = parseInt(peopleInput.value);

  if (peopleValue <= 0 || isNaN(peopleValue)) {
    alertMessage.style.display = "block";
    peopleInput.classList.add("input-error");
  } else {
    alertMessage.style.display = "none";
    peopleInput.classList.remove("input-error");
  }
  calculateTip();
});

// Al hacer clic en un botón de propina
tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipValue = parseFloat(button.innerHTML) / 100;
    customTipInput.value = "";

    // Sacar clase .active de todos los botones e input
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    customTipInput.classList.remove("active");

    button.classList.add("active");

    calculateTip();
  });
});

// Al hacer clic en el input personalizado
customTipInput.addEventListener("click", () => {
  // Sacar .active de los botones
  tipButtons.forEach((btn) => btn.classList.remove("active"));

  customTipInput.classList.add("active");
});

// Escuchar clics en todo el documento para quitar .active si se hace clic fuera
document.addEventListener("click", (event) => {
  const isTipButton = event.target.classList.contains("tip-button");
  const isCustomInput = event.target === customTipInput;

  if (!isTipButton && !isCustomInput) {
    tipButtons.forEach((btn) => btn.classList.remove("active"));
    customTipInput.classList.remove("active");
  }
});

function calculateTip() {
  if (billValue > 0 && peopleValue > 0) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let totalAmount = (billValue + billValue * tipValue) / peopleValue;

    tipAmountDisplay.innerHTML = `$${tipAmount.toFixed(2)}`;
    totalDisplay.innerHTML = `$${totalAmount.toFixed(2)}`;
  }
}

resetButton.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customTipInput.value = "";
  tipAmountDisplay.innerHTML = "$0.00";
  totalDisplay.innerHTML = "$0.00";
  alertMessage.style.display = "none";
  peopleInput.classList.remove("input-error");
  billValue = 0;
  peopleValue = 0;
  tipValue = 0;

  // Quitar clase .active de botones e input
  tipButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
  customTipInput.classList.remove("active");
});
