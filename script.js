import { TextData } from "./data/TextData.js";
import { StandardTemplates } from "./standard-templates/standard-templates.js";
import { InitialCheckboxData } from "./data/InitialCheckboxData.js";

// grabs from initial checkbox data to populate all categories and checkboxes 
function checkboxPopulation(){}

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const copyButton = document.querySelector('#copy-icon');

let caseNotesTextField = document.querySelector("#case-notes-text-field");

//todo: add popup that goes away after copy to show content copied
copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(caseNotesTextField.value).then(() => {
    console.log('Content copied to clipboard');
  },() => {
    console.error('Failed to copy');
  });
})

function populateCaseNotes(){
   Object.keys(TextData).forEach(category => {
    if(TextData[category].length !== 0){
      caseNotesTextField.value += ` ${category}: \n`
      TextData[category].forEach( element => {
        caseNotesTextField.value += `\t\u2022 ${element} \n`;
      })
      caseNotesTextField.value += `\n`
    }
   })
};

const templateDropdown = document.querySelector('#template-dropdown');
templateDropdown.addEventListener("change", (e) => {
  loadCaseNotesTemplate(e.target.value);
});

function loadCaseNotesTemplate(selectedTemplateValue){
  const template = StandardTemplates.find((element) => element.id === selectedTemplateValue)
  caseNotesTextField.value = template.templateText;
};


//adds and removes checkbox values when checked or unchecked
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', (e) =>{
    if(e.target.checked){
      TextData[e.target.getAttribute('data-category')].push(e.target.value)
    } else{
      let index = TextData[e.target.getAttribute('data-category')].indexOf(e.target.value)
      TextData[e.target.getAttribute('data-category')].splice(index,1);
      //console.log(TextData[e.target.getAttribute('data-category')])
    }
    caseNotesTextField.value = "";
    populateCaseNotes()
  })
})

const commaInsertionInputText = document.querySelector("#comma-insertion-input-text");
let commaInsertionOutputArea = document.querySelector("#comma-insertion-output-area");
let commaInsertionButton = document.querySelector("#comma-insertion-button");

commaInsertionButton.addEventListener('click', () =>{
  let filterReg = /(6|7|11|12|20|23)\w{6}/g

  commaInsertionOutputArea.value = commaInsertionInputText.value.match(filterReg).join();
});