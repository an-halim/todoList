const button = document.getElementById("add");
const input = document.getElementById("data");
const field = document.getElementById("field");
const emoji = document.getElementById("emoji");

const addTodo = () => {  
  const createElemet = () => {  
  
    //new div
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");
    //create li
    const li = document.createElement("li");
    newDiv.appendChild(li);
  
    //create text node
    const todo = document.createTextNode(input.value);
    li.appendChild(todo);
  
    //create action wrapper
    const actionWrapper = document.createElement("div");
    actionWrapper.classList.add("action");
    newDiv.appendChild(actionWrapper);
  
    //create checkbox
    var x = document.createElement("INPUT");
    x.setAttribute("type", "checkbox");
    x.classList.add("checkbox");
    actionWrapper.appendChild(x);
  
    //create trash button
    const trashButton = document.createElement("a");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trashButton.classList.add("trash");
    trashButton.id = "trash";
    actionWrapper.appendChild(trashButton);
  
    //add to parent
    field.prepend(newDiv);
  };
  input.value == ""
    ? alert("Please enter valid todo")
    : input.value.length < 5
    ? alert("Please enter more than 5 characters")
    : input.value.length > 20
    ? alert("Please enter less than  20 characters")
    : createElemet();
  input.value = "";
};

const action = (e) => {  
  const item = e.target;
  if (item.classList[0] === "checkbox") {
    const child = item.parentElement;
    child.parentElement.classList.toggle("checked");
  }
  if (item.classList[0] === "trash" || item.classList.toString().includes("trash")) {    
    const child = item.parentElement;
    child.parentElement.parentElement.classList.toggle("delete");
    document.addEventListener("transitionend", () => {
        child.parentElement.parentElement.remove();
    });
  }
};

// random emoji
window.onload = () => {
  fetch("https://ranmoji.herokuapp.com/emojis/api/v.1.0/").then((res) => {
    res.json().then((data) => {
        emoji.innerHTML = data.emoji;        
    })
  });
}

// event listener
data.addEventListener("keypress", (e) => e.key === "Enter" ? addTodo() : null);
button.addEventListener("click", addTodo);
field.addEventListener("click", action);
