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

//todo: minor bug where the display is not captured the first click but works after
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


