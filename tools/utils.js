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

const collapseDiv = document.querySelectorAll(".collapse-div");

collapseDiv.forEach(div => {
  div.addEventListener('click', (e) => {
    let image = e.target.querySelector(".collapse-button");
    collapseToggle(image);
  })
})

function collapseToggle(image){
  const element = document.querySelector(`#${image.getAttribute('data-collapse')}`);
  if(element.style.display === "flex"){
    element.style.display = "none";
    image.src = "./images/chevron_down.png"
  } else {
    image.src = "./images/chevron_up.png"
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