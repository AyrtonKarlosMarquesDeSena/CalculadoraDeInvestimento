import { createElement } from "react";

const isNotEmptyArray = (arrayElement) => {
  return Array.isArray(arrayElement) && arrayElement.length > 0;
};

const creatTable = (columnsArray, dataArray, tableId) => {
  if (
    !isNotEmptyArray(columnsArray) ||
    !isNotEmptyArray(dataArray) ||
    !tableId
  ) {
    throw new Error(
      "Para a correta execução, precisamos de um array com as colunas, outro com as informações das linhas e também o id do elemento tabela selecionado",
    );
  }
  const tableElement = document.getElementById(tableId)
  if(!tableElement || tableElement.nodeName !=="TABLE" ){
    throw new Error ("Id informado não corresponde a nenhum elemento table")
  }

  creatTableHeader(tableElement, columnsArray)
  creatTableBody()

};

function creatTableHeader(tableReference, columnsArray){
    function creatTheadElement(tableReference){
        const thead = document.createElement("thead")
        tableReference.appendChild(thead)
        return thead
    }
    
    const tableHeardReference = tableReference.querySelector("thead") ?? creatTheadElement(tableReference)
    const hearderRow = document.createElement("tr")
    for (const tableColumnObject of columnsArray){
        const hearderElement = `<th class='text-center'>${tableColumnObject.columnLabel}</th>`
        hearderRow.innerHTML += hearderElement
    }
    tableHeardReference.appendChild(hearderRow)
    
}

function creatTableBody(){

}