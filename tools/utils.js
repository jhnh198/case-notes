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

function collapseToggle(image){
  const element = document.querySelector(`#${image.getAttribute('data-collapse')}`);
  if(element.classList.contains("checkbox-div-collapsed")){
    element.classList.remove("checkbox-div-collapsed");
    element.classList.add("checkbox-div-expanded");
    image.src = "./images/chevron_down.png"
  } else{
    image.src = "./images/chevron_up.png"
    element.classList.remove("checkbox-div-expanded");
    element.classList.add("checkbox-div-collapsed");
  } 
}

function regexFilter(inputText, outputArea, button, filterReg){
  button.addEventListener('click', () =>{
    //to clear commas that are already present and avoid adding additional
    let commaFilter = inputText.value.replace(',', ' ');
    outputArea.value = commaFilter.match(filterReg).join();
  });
}