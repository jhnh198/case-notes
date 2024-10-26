import { TinyMceTemplates } from "./tinymce-templates/tinymce-templates.js";

const caseNotes = {
  selector: '#case-notes-text-field',
  menubar: false,
  plugins: [
    'lists',
    'autolink'
  ],
  toolbar: 'undo redo | bold italic underline',
  valid_styles: {
    '*': 'font-size,font-family,color,text-decoration,text-align'
  },
}

const additionalNotes = {
  selector: '#case-notes-additional-notes',
  toolbar: 'undo redo | blocks | ' +
  'bold italic backcolor | alignleft aligncenter ' +
  'alignright alignjustify | bullist numlist outdent indent | ' +
  'removeformat | help',
};

tinymce.init(caseNotes);
tinymce.init(additionalNotes);

const checkboxes = document.querySelectorAll('input[type=checkbox]');
const copyButton = document.querySelector('#copy-icon');
const copyNotification = document.querySelector('#content-copied-notification');
const templateDropdown = document.querySelector('#template-dropdown');

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

//adds and removes checkbox values when checked or unchecked
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('click', (e) =>{
    //could add a separate checkbox gathering function
    populateCaseNotes(false);
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

tinymce.activeEditor.on('change', (e) => {
  let content = tinymce.activeEditor.getContent();
  console.log(content);
});

templateDropdown.addEventListener('change', () => {
  populateCaseNotes(true);
});

function populateCaseNotes(isTemplate){
  let contentElement = document.createElement('div');
  let escalation = false;

  let NoteData = {
    issue: [],
    troubleshooting: [],
    recommended: [],
    escalation: [],
    additionalNotes: [],
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

    tinymce.activeEditor.setContent(contentElement.innerHTML);
};