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

//todo: minor bug where the display is not captured the first click but works after
function dropdownToggle(e){
  const element = document.querySelector(`#${e.target.getAttribute('data-dropdown')}`);
  if(element.style.display === "flex"){
    element.style.display = "none";
    e.target.src = "./images/chevron_down.png"
  } else {
    e.target.src = "./images/chevron_up.png"
    element.style.display = "flex";
  } 
}