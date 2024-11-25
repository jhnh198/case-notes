import { TinyMceTemplates } from "./tinymce-templates/tinymce-templates.js";

tinymce.init({
  selector: '#additional-notes-text-field',
});

tinymce.init({
  selector: '#case-notes-div',
  readonly: false,
  plugins: 'lists',
});

let testTextTemplateModel = {
  issue: ['Issue: '],
  troubleshooting: ['Troubleshooting:'],
  recommended: ['Recommended: '],
  escalation: ['Escalation: '],
  additional: ['Additional Notes: '],
}

let testTemplateTextValues = {
  typedPosition: 0,
  selectedPosition: 0,
  selectedText: '',
  selectedTextLength: 0,
  allTextContentBeforeType: '',
  allTextContentAfterType: '',
}

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const copyButton = document.querySelector('#copy-icon');
const copyNotification = document.querySelector('#content-copied-notification');
const templateDropdown = document.querySelector('#template-dropdown');
const additionalNotesTextArea = document.querySelector('#additional-notes-text-field');
const caseNotesDiv = document.querySelector('#case-notes-div');
let useTemplate = false;

//get user info
const firstNameInput = document.querySelector("#first-name-input");
const lastNameInput = document.querySelector("#last-name-input");
const companyIdInput = document.querySelector("#company-id-input");
//const companyNameInput = document.querySelector("#company-name-input");
const truckNumberInput = document.querySelector("#truck-number-input");
const phoneNumberInput = document.querySelector("#phone-number-input");
//const dsnInput = document.querySelector("#dsn-input");

const testText = document.querySelector("#test-text");

testText.addEventListener("keydown", (e) => {
  console.log(testText.selectionStart);
});

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

//todo: remove tags from text
tinymce.get('additional-notes-text-field').on('change', () => {
  //populateCaseNotes(useTemplate);
});

tinymce.get('case-notes-div').on('keyup', (e) => {
  console.log(caseNotesDiv.selectionStart);
  let text = e.target.value;
  console.log(text);
});

//adds and removes checkbox values when checked or unchecked
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', (e) => {
    //could add a separate checkbox gathering function
    //populateCaseNotes(useTemplate);

    let category = e.target.getAttribute('data-category');
    let value = e.target.value;
    let categoryArray = testTextTemplateModel[category];
    categoryArray.push(value);
    testTextTemplateModel[category] = categoryArray;
  })
});

/*

how to insert text at cursor position in a contenteditable div
https://stackoverflow.com/questions/1064089/inserting-a-text-where-cursor-is-using-javascript-jquery

steps: 
1. get cursor position
2. insert text at cursor position in template
3. update cursor position

function insertTextAtCursor(text){
  let selection = window.getSelection();
  let range = selection.getRangeAt(0);
  range.deleteContents();
  range.insertNode(document.createTextNode(text));
}
*/

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

function convertTaggedContentToList(taggedContent){
  let list = taggedContent.split('<li>');
  list = list.map(item => {
    return item.replace('</li>', '');
  });
  return list;
}

function populateCaseNotes(isTemplate){
  let contentElement = document.createElement('div');
  let escalation = false;

  let NoteData = {
    issue: [],
    troubleshooting: [],
    recommended: [],
    escalation: [],
    additional: [tinymce.get('additional-notes-text-field').getContent()]
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
    //get checked checkboxes and add to list
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

  caseNotesDiv.innerHTML = contentElement.innerHTML;
};