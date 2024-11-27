const tools = document.querySelector(".tools");
const notes = document.querySelector(".notes-main-section")

function showHideTools(id){
  if(id === "tools-nav-button"){
    tools.style.display = "block";
    notes.style.display = "none";
  } else {
    tools.style.display = "none";
    notes.style.display = "flex";
  } 
}

const collapseButton = document.querySelectorAll(".collapse-button");

collapseButton.forEach(button => {
  button.addEventListener('click', (e) => {
    collapseToggle(e);
  })
})

//todo: move collapse to work for the full area of the div
function collapseToggle(e){
  const element = document.querySelector(`#${e.target.getAttribute('data-collapse')}`);
  if(element.style.display === "flex"){
    element.style.display = "none";
    e.target.src = "./images/chevron_down.png"
  } else {
    e.target.src = "./images/chevron_up.png"
    element.style.display = "flex";
  } 
}

function regexFilter(inputText, outputArea, button, filterReg){
  button.addEventListener('click', () =>{
    //to clear commas that are already present and avoid adding additional
    let commaFilter = inputText.value.replace(',', ' ');
    outputArea.value = commaFilter.match(filterReg).join();
  });
}