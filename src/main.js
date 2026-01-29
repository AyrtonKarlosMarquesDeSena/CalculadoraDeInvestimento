import generateReturnsArray from "./investimento";
import { Chart } from "chart.js/auto";

const finalMoneyChart = document.getElementById("final-money-ditribution");
const progressionChart = document.getElementById("progression");

const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form");
let  doughnutChartReference = {}
let progressionChartReference = {}


function formatCurrency(value) {
  return value.toFixed(2);
}

function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
  resetChart()
  const startingAmount = Number(
    document.getElementById("starting-amount").value.replace(",", "."),
  );
  const additionalContribution = Number(
    document.getElementById("additional-contribution").value.replace(",", "."),
  );
  const timeAmount = Number(document.getElementById("time-amount").value);
  const timeAmountPeriod = document.getElementById("time-amount-period").value;
  const returnRate = Number(
    document.getElementById("return-rate").value.replace(",", "."),
  );
  const returnRatePeriod = document.getElementById("return-rate-period").value;
  const taxRate = Number(
    document.getElementById("tax-rate").value.replace(",", "."),
  );

  const returnsArray = generateReturnsArray(
    startingAmount,
    timeAmount,
    timeAmountPeriod,
    additionalContribution,
    returnRate,
    returnRatePeriod,
  );

  const finalInvestmentObject = returnsArray[returnsArray.length - 1];

  console.log(returnsArray);
  doughnutChartReference = new Chart(finalMoneyChart, {
    type: "doughnut",
    data: {
      labels: ["Investimento Total", "Rendimento", "Imposto"],
      datasets: [
        {
          label: "My First Dataset",
          data: [
            formatCurrency(finalInvestmentObject.investedAmount),
            formatCurrency(
              finalInvestmentObject.totalInterestReturn * (1 - taxRate / 100),
            ),
            formatCurrency(
              (finalInvestmentObject.totalInterestReturn * taxRate) / 100,
            ),
          ],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });

  progressionChartReference =  new Chart(progressionChart, {
    type: "bar",
    data: {
      labels: returnsArray.map((investmentObject) => investmentObject.month),
      datasets: [
        {
          label: "Total Investido",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.investedAmount),
          ),
          backgroundColor: "rgb(255, 99, 132)",
        },
        {
          label: "Retorno do Investimento",
          data: returnsArray.map((investmentObject) =>
            formatCurrency(investmentObject.totalInterestReturn),
          ),
          backgroundColor: "rgb(54, 162, 235)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    },
  });
}

function validateInput(evt) {
  if (evt.target.value === "") {
    return;
  }
  const { parentElement } = evt.target;
  const grandParentElement = evt.target.parentElement.parentElement;
  const inputValue = evt.target.value.replace(",", ".");
  const errorTextElement = document.createElement("P");

  parentElement.classList.remove("error");
  const existingError = grandParentElement.querySelector(".error-text");
  if (existingError) existingError.remove();

  if (isNaN(inputValue) || Number(inputValue) <= 0) {
    parentElement.classList.add("error");
    errorTextElement.classList.add("text-red-500", "error-text");
    errorTextElement.innerText = "Insira um valor numérico e maior que 0";
    grandParentElement.appendChild(errorTextElement);
  } else if (
    evt.target.name === "time-amount" &&
    !Number.isInteger(Number(inputValue))
  ) {
    parentElement.classList.add("error");
    errorTextElement.classList.add("text-red-500", "error-text");
    errorTextElement.innerText = "Insira apenas numeros inteiros";
    grandParentElement.appendChild(errorTextElement);
  }
}

function isObjectEmpty(obj){
  return Object.keys(obj).length === 0
}

function resetChart(){
  if (!isObjectEmpty(doughnutChartReference) && !isObjectEmpty(progressionChartReference)){
    // Obs: destroy é um metodo da biblioteca Chart.js
    doughnutChartReference.destroy()
    progressionChartReference.destroy()
  }
}

function clearForm() {
  form["starting-amount"].value = "";
  form["additional-contribution"].value = "";
  form["time-amount"].value = "";
  form["return-rate"].value = "";
  form["tax-rate"].value = "";

  resetChart()

  const errorInputContainers = document.querySelectorAll(".error");

  for (const errorInputContainer of errorInputContainers) {
    errorInputContainer.classList.remove("error");
    errorInputContainer.parentElement.querySelector("p").remove();
  }
}

for (const forElement of form) {
  if (forElement.tagName === "INPUT" && forElement.hasAttribute("name")) {
    forElement.addEventListener("blur", validateInput);
  }
}

// form.addEventListener("submit", renderProgression);
clearFormButton.addEventListener("click", clearForm);
