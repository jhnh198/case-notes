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

const dropdownButton = document.querySelectorAll(".dropdown-button");

dropdownButton.forEach(button => {
  button.addEventListener('click', (e) => {
    dropdownToggle(e);
    
  })
})

function dropdownToggle(e){
  console.log(e.target.getAttribute('data-dropdown'))
  const element = document.querySelector(`#${e.target.getAttribute('data-dropdown')}`);
  if(element.style.display === "none"){
    e.target.src = "./images/chevron_up.png"
    element.style.display = "flex";
  } else {
    element.style.display = "none";
    e.target.src = "./images/chevron_down.png"
  } 
}