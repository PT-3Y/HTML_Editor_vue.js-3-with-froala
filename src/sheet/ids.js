// import FroalaEditor from 'froala-editor';
// import $ from 'jquery'
export const ids = [];
export const checkId = (data, inputId, originId) =>{
    var condition = false;
    var dataElement = document.createElement ("div")
    //get all HTML data of editor
    dataElement.innerHTML = data;
    const tooltipElement = dataElement.querySelectorAll(`.${'fr-popup'}`)[0]
    if(tooltipElement)
    tooltipElement.remove();
    var inputElements = dataElement.querySelectorAll('input')
    if(inputId==originId)
    condition = false
    else {
        for (const inputElement of inputElements) {
            // Access each input element here
           if(inputElement.getAttribute('id')==inputId){
            condition = true;
           }
          }

    }
    console.log(condition,'here last condition')
 return condition
}