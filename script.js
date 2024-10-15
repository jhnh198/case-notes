import { TinyMceTemplates } from "./tinymce-templates/tinymce-templates.js";

tinymce.init({
  selector: '#case-notes-text-field',
});

let TemplateData = {
  issue: [],
  troubleshooting: [],
  recommended: [],
  escalation: [],
  additionalNotes: [],
}

let checkboxData = {
  issue: [],
  troubleshooting: [],
  recommended: [],
};

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const copyButton = document.querySelector('#copy-icon');
const copyNotification = document.querySelector('#content-copied-notification');
const TemplateDropdown = document.querySelector('#template-dropdown');

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

  let NoteData = {
    issue: [],
    troubleshooting: [],
    recommended: [],
    escalation: [],
    additionalNotes: [],
  }

  Object.keys(NoteData).forEach(category => {
    //set header for each category
    let listElement = document.createElement('ul');
    let categoryElement = document.createElement('h3');
    categoryElement.textContent = category.toLocaleUpperCase();
    contentElement.appendChild(categoryElement);

    //get checked checkboxes and add to list
    checkboxes.forEach(element => {
      let listItem = document.createElement('li');
      if (element.checked && element.getAttribute('data-category') === category){
        listItem.textContent = element.value;
        listElement.appendChild(listItem);
      }
    });

    contentElement.appendChild(listElement);
  });

  //todo: handle template info
  console.log(TemplateDropdown);
  TemplateData = TinyMceTemplates[TemplateDropdown.value];
  console.log(TemplateData);



  //populate escalation information
/*   if(TextData['escalation']){
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
  } */

  tinymce.activeEditor.setContent(contentElement.innerHTML);
};

//adds and removes checkbox values when checked or unchecked
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', (e) =>{
    if(e.target.checked){
      checkboxData[e.target.getAttribute('data-category')].push(e.target.value);
    } else{
      let index = checkboxData[e.target.getAttribute('data-category')].indexOf(e.target.value)
      checkboxData[e.target.getAttribute('data-category')].splice(index,1);
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