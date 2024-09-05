import { TextData } from "./data/TextData.js";
import { TinyMceTemplates } from "./tinymce-templates/tinymce-templates.js";

tinymce.init({
  selector: '#case-notes-text-field'
});

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const copyButton = document.querySelector('#copy-icon');
const copyNotification = document.querySelector('#content-copied-notification');

let caseNotesTextField = document.querySelector("#case-notes-text-field");

//this is how you get the cursor position in a text field to insert notes
//const cursorPosition = textField.selectionStart;

//get user info
const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const companyIdInput = document.querySelector("#company-id-input");
//const companyNameInput = document.querySelector("#company-name-input");
const truckNumberInput = document.querySelector("#truck-number-input");
const phoneNumberInput = document.querySelector("#phone-number-input");
//const dsnInput = document.querySelector("#dsn-input");

let escalationInfo = {      
  CID: `CID: ${companyIdInput.value}`,
  ContactName: `Contact Name: ${firstNameInput.value} ${lastNameInput.value}`,
  ContactPhone: `Contact Phone: ${phoneNumberInput.value}`,
  TruckNumber: `Truck Number: ${truckNumberInput.value}`,
}

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
    if(TextData[category].length !== 0){
      let categoryElement = document.createElement('h3');
      categoryElement.textContent = category;
      contentElement.appendChild(categoryElement);
      TextData[category].forEach( element => {
        let listItem = document.createElement('li');
        listItem.textContent = element;
        listElement.appendChild(listItem);
      })
      contentElement.appendChild(listElement);
    }
  }
)
  tinymce.activeEditor.setContent(contentElement.innerHTML);
};

const templateDropdown = document.querySelector('#template-dropdown');
templateDropdown.addEventListener("change", (e) => {
  loadCaseNotesTemplate(e.target.value);
});

function loadCaseNotesTemplate(selectedTemplateValue){
  const template = TinyMceTemplates.find((element) => element.id === selectedTemplateValue);
  let content = document.createElement('div');
  let issueElement = document.createElement('h3');
  issueElement.textContent = `Issue: ${template.issue}`;
  content.appendChild(issueElement);

  let troubleshootingElement = document.createElement('ul');
  template.troubleshooting.forEach(element => {
    let listItem = document.createElement('li');
    listItem.textContent = element;
    troubleshootingElement.appendChild(listItem);
  });

  content.appendChild(troubleshootingElement);

  if(template.escalation){
    let escalationElement = document.createElement('ul');
    let escalationHeader = document.createElement('h3');
    escalationHeader.textContent = "Escalation Information";
    escalationElement.appendChild(escalationHeader);
    escalationInfo.forEach(element => { 
      let listItem = document.createElement('li');
      listItem.textContent = element;
      escalationElement.appendChild(listItem);  
    });
    content.appendChild(escalationElement);
  }

  let additionalNotesElement = document.createElement('ul');
  let additionalNotesHeader = document.createElement('h3');
  additionalNotesHeader.textContent = "Additional Notes";
  additionalNotesElement.appendChild(additionalNotesHeader);
  template.additionalNotes.forEach(element => {

    let listItem = document.createElement('li');
    listItem.textContent = element;
    escalationElement.appendChild(listItem);
  });

  content.appendChild(additionalNotesElement);

  tinymce.activeEditor.setContent(content.innerHTML);
};

function mergeCaseNotesTemplate(template){
  let content = document.createElement('div');
  let issueElement = document.createElement('h3');
  issueElement.textContent = `Issue: ${template.issue}`;
  content.appendChild(issueElement);

  let troubleshootingElement = document.createElement('ul');
  template.troubleshooting.forEach(element => {
    let listItem = document.createElement('li');
    listItem.textContent = element;
    troubleshootingElement.appendChild(listItem);
  });

  content.appendChild(troubleshootingElement);

  if(template.escalation){
    let escalationElement = document.createElement('ul');
    let escalationHeader = document.createElement('h3');
    escalationHeader.textContent = "Escalation Information";
    escalationElement.appendChild(escalationHeader);
    escalationInfo.forEach(element => { 
      let listItem = document.createElement('li');
      listItem.textContent = element;
      escalationElement.appendChild(listItem);  
    });
    content.appendChild(escalationElement);
  }

  let additionalNotesElement = document.createElement('ul');
  let additionalNotesHeader = document.createElement('h3');
  additionalNotesHeader.textContent = "Additional Notes";
  additionalNotesElement.appendChild(additionalNotesHeader);
  template.additionalNotes.forEach(element => {

    let listItem = document.createElement('li');
    listItem.textContent = element;
    escalationElement.appendChild(listItem);
  });

  content.appendChild(additionalNotesElement);

  return content.innerHTML;
}

//adds and removes checkbox values when checked or unchecked
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', (e) =>{
    if(e.target.checked){
      TextData[e.target.getAttribute('data-category')].push(e.target.value)
    } else{
      let index = TextData[e.target.getAttribute('data-category')].indexOf(e.target.value)
      TextData[e.target.getAttribute('data-category')].splice(index,1);
    }
    populateCaseNotes();
  })
})

const commaInsertionInputText = document.querySelector("#comma-insertion-input-text");
let commaInsertionOutputArea = document.querySelector("#comma-insertion-output-area");
let commaInsertionButton = document.querySelector("#comma-insertion-button");

commaInsertionButton.addEventListener('click', () =>{
  //to clear commas that are already present and avoid adding additional
  let commaFilter = commaInsertionInputText.value.replace(',', ' ');
  let filterReg = /(6|7|11|12|20|23)\d{6}/g

  commaInsertionOutputArea.value = commaFilter.value.match(filterReg).join();
});
