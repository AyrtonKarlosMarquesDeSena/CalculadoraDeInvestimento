import generateReturnsArray from "./investimento";
const form = document.getElementById("investment-form");
const clearFormButton = document.getElementById("clear-form")


function renderProgression(evt) {
  evt.preventDefault();
  if (document.querySelector(".error")) {
    return;
  }
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
  console.log(returnsArray);
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
    !Number.isInteger(Number(inputValue) || Number(inputValue) <= 0)
  ) {
    parentElement.classList.add("error");
    errorTextElement.classList.add("text-red-500", "error-text");
    errorTextElement.innerText = "Insira apenas numeros inteiros";
    grandParentElement.appendChild(errorTextElement);
  }
}

function clearForm() {
  form['starting-amount'].value = ''
  form['additional-contribution'].value = ''
  form['time-amount'].value = ''
  form['return-rate'].value = ''
  form['tax-rate'].value = ''
  
  const errorInputContainers = document.querySelectorAll('.error')


  for (const errorInputContainer of errorInputContainers){
    errorInputContainer.classList.remove('error')
    errorInputContainer.parentElement.querySelector('p').remove()
  }
}

for (const forElement of form) {
  if (forElement.tagName === "INPUT" && forElement.hasAttribute("name")) {
    forElement.addEventListener("blur", validateInput);
  }
}

form.addEventListener("submit", renderProgression);
clearFormButton.addEventListener("click", clearForm)