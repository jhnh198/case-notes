import { TinyMceTemplates } from "./tinymce-templates/tinymce-templates.js";

tinymce.init({
  selector: '#case-notes-text-field',
});

let TextData = {
  issue: [],
  troubleshooting: [],
  recommended: [],
  escalation: [],
  additionalNotes: [],
}

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const copyButton = document.querySelector('#copy-icon');
const copyNotification = document.querySelector('#content-copied-notification');

//get user info
const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const companyIdInput = document.querySelector("#company-id-input");
//const companyNameInput = document.querySelector("#company-name-input");
const truckNumberInput = document.querySelector("#truck-number-input");
const phoneNumberInput = document.querySelector("#phone-number-input");
//const dsnInput = document.querySelector("#dsn-input");

copyButton.addEventListener("click", () => {
  tinymce.execCommand('selectAll');
  tinymce.execCommand('copy');
  copyNotification.classList.toggle("show");
  copyButton.classList.add("copy-icon-clicked");
  setTimeout(function(){
    copyNotification.classList.toggle("show");
    copyButton.classList.remove("copy-icon-clicked");
  }, 2000);
});

function populateCaseNotes(){
  let contentElement = document.createElement('div');

   Object.keys(TextData).forEach(category => {
    let listElement = document.createElement('ul');
    if(TextData[category].length !== 0 && category !== 'escalation'){
      let categoryElement = document.createElement('h3');
      categoryElement.textContent = category.toLocaleUpperCase();
      contentElement.appendChild(categoryElement);
      Array(TextData[category]).forEach( element => {
        let listItem = document.createElement('li');
        listItem.textContent = element;
        listElement.appendChild(listItem);
      })
      contentElement.appendChild(listElement);
    }
  });

  if(TextData['escalation']){
    let escalationElement = document.createElement('ul');
    let escalationHeader = document.createElement('h3');
    escalationHeader.textContent = "Escalation Information";
    escalationElement.appendChild(escalationHeader);

    let escalationInfo = {      
      CID: `CID: ${companyIdInput.value}`,
      ContactName: `Contact Name: ${firstNameInput.value} ${lastNameInput.value}`,
      ContactPhone: `Contact Phone: ${phoneNumberInput.value}`,
      TruckNumber: `Truck Number: ${truckNumberInput.value}`,
    }

    Object.keys(escalationInfo).forEach(key => { 
      let listItem = document.createElement('li');
      listItem.textContent = escalationInfo[key];
      escalationElement.appendChild(listItem);  
    });
    contentElement.appendChild(escalationElement);
  }

  tinymce.activeEditor.setContent(contentElement.innerHTML);
};

const templateDropdown = document.querySelector('#template-dropdown');
templateDropdown.addEventListener("change", (e) => {
  let selectedTemplateValue = TinyMceTemplates.find((element) => element.id === e.target.value);
  mergeCaseNotesTemplate(selectedTemplateValue);
});

//todo: get template data to merge with case notes. replace the text data with the template data and all the checked checkboxes
function mergeCaseNotesTemplate(template){
  let templateData = {
    issue: template.issue,
    troubleshooting: template.troubleshooting,
    recommended: [],
    escalation: template.escalation,
    additionalNotes: template.additionalNotes,
  };

  let checkboxData = {
    issue: [],
    troubleshooting: [],
    recommended: [],
    escalation: [],
    additionalNotes: [],
  }
  checkboxes.forEach(checkbox => {
    if(checkbox.checked){
      checkboxData[checkbox.getAttribute('data-category')].push(checkbox.value);
    }
  });

  let mergedText = {};
;

  return mergedText;
}

//adds and removes checkbox values when checked or unchecked
//todo: allow multiple checkboxes to be checked
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', (e) =>{
    if(e.target.checked){
      TextData[e.target.getAttribute('data-category')].push(e.target.value);
    } else{
      let index = TextData[e.target.getAttribute('data-category')].indexOf(e.target.value)
      TextData[e.target.getAttribute('data-category')].splice(index,1);
    }
    populateCaseNotes();
  })
});

const commaInsertionInputText = document.querySelector("#comma-insertion-input-text");
let commaInsertionOutputArea = document.querySelector("#comma-insertion-output-area");
let commaInsertionButton = document.querySelector("#comma-insertion-button");

commaInsertionButton.addEventListener('click', () =>{
  //to clear commas that are already present and avoid adding additional
  let commaFilter = commaInsertionInputText.value.replace(',', ' ');
  let filterReg = /(6|7|11|12|20|23)\d{6}/g

  commaInsertionOutputArea.value = commaFilter.value.match(filterReg).join();
});