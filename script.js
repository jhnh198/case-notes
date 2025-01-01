import { TinyMceTemplates } from "./tinymce-templates/tinymce-templates.js";
import { Accordion } from "./tools/Accordion.js";

tinymce.init({
  selector: '#additional-notes-text-field',
  plugins: 'lists',
  menubar: 'file edit view insert format tools table tc help',
  toolbar: "undo redo | blocks fontsizeinput | bold italic | numlist bullist | lineheight outdent indent | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",
});

tinymce.init({
  selector: '#case-notes-div',
  toolbar: false,
  menubar: false,
  readonly: true,
  plugins: 'lists',
});

document.querySelectorAll('details').forEach((el) => {
  new Accordion(el);
});

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const copyButton = document.querySelector('#copy-icon');
const copyNotification = document.querySelector('#content-copied-notification');
const templateDropdown = document.querySelector('#template-dropdown');
let useTemplate = false;

//get user info
const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const companyIdInput = document.querySelector("#company-id-input");
//const companyNameInput = document.querySelector("#company-name-input");
const truckNumberInput = document.querySelector("#truck-number-input");
const phoneNumberInput = document.querySelector("#phone-number-input");
//const dsnInput = document.querySelector("#dsn-input");

copyButton.addEventListener("click", () => {
  tinymce.get('case-notes-div').focus();
  tinymce.execCommand('selectAll');
  tinymce.execCommand('copy');
  copyNotification.classList.toggle("show");
  copyButton.classList.add("copy-icon-clicked");
  setTimeout(function(){
    copyNotification.classList.toggle("show");
    copyButton.classList.remove("copy-icon-clicked");
  }, 2000);
});

tinymce.get('additional-notes-text-field').on('change', () => {
  populateCaseNotes(useTemplate);
});

//adds and removes checkbox values when checked or unchecked
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', () => {
    populateCaseNotes(useTemplate);
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

templateDropdown.addEventListener('change', () => {
  useTemplate = true;
  populateCaseNotes(useTemplate);
});

function populateCaseNotes(isTemplate){
  let contentElement = document.createElement('div');
  let escalation = false;

  //this handles checkbox data and escalation
  let NoteData = {
    issue: [],
    troubleshooting: [],
    recommended: [],
    escalation: [],
  }

  if(isTemplate){
    let templateData = TinyMceTemplates.find(template => template.id === templateDropdown.value);
    escalation = templateData.escalation;
    NoteData.issue.push(templateData.issue);
    templateData.troubleshooting.forEach(item => {
      NoteData.troubleshooting.push(item);
    });
  }

  //handle checkbox data  
  Object.keys(NoteData).forEach(category => {
    checkboxes.forEach(element => {
      if (element.checked && element.getAttribute('data-category') === category){
        NoteData[category].push(element.value);
      }
    });
  });

  //get user info
  if(isTemplate && escalation){
    NoteData.escalation.push(`Contact: ${firstNameInput.value} ${lastNameInput.value}`);
    NoteData.escalation.push(`Company ID: ${companyIdInput.value}`);
    NoteData.escalation.push(`Truck Number: ${truckNumberInput.value}`);
    NoteData.escalation.push(`Phone Number: ${phoneNumberInput.value}`);
  }

  Object.keys(NoteData).forEach(category => {
    let listElement = document.createElement('ul');

    if(NoteData[category].length === 0){
      return;
    }
    
    let categoryElement = document.createElement('h3');
    categoryElement.textContent = category.toLocaleUpperCase();
    contentElement.appendChild(categoryElement);

    NoteData[category].forEach(item => {
      let listItem = document.createElement('li');
      listItem.textContent = item;
      listElement.appendChild(listItem);
    });

    contentElement.appendChild(listElement);
  });

  //handle additional notes as is
  let additionalNotesHtml = tinymce.get('additional-notes-text-field').save();

  if(additionalNotesHtml !== ""){
    let additionalNotesHeader = document.createElement('h3');
    additionalNotesHeader.textContent = "ADDITIONAL NOTES";
    contentElement.appendChild(additionalNotesHeader);
  }

  //set content allows html to be added to case notes
  tinymce.get("case-notes-div").setContent(contentElement.innerHTML + additionalNotesHtml);

  
};

let clearNotesButton = document.querySelector("#clear-notes-button");
clearNotesButton.addEventListener("click", () => {
  tinymce.get("case-notes-div").setContent("");
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  templateDropdown.selectedIndex = 0;
  useTemplate = false;
});