const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

//count tasks and write them to countValue variable (show to user)
const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
};
//add a task
const addTask = () => {
    //the error message will be hidden when the user adds a task
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    //if there is no task, error message will be shown 
    // (or if the user types a space)
    if (!taskName) {
        //the error message will be shown after 200 milliesecond
        setTimeout(() => {
            error.style.display = "block";//this code makes the error message visible
        }, 200);
        //show error message if task name is invalid or empty
        return;
    }

    //if taskName is not empty:
    //the HTML structure for the new task is created
    const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
    <i class="fa-solid fa-pen-to-square"></i>
    </button>
    <button class="delete">
    <i class="fa-solid fa-trash"></i>
    </button>
     </div>`;

     //add the string (task variable) to the end of
     //taskContainer (#tasks)
     tasksContainer.insertAdjacentHTML("beforeend",task);

     const deleteButtons = document.querySelectorAll(".delete");
     deleteButtons.forEach((button) => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
     });

     //select all buttons with class "edit"
     const editButtons = document.querySelectorAll(".edit");
     editButtons.forEach((editBtn) => {
        //add click event to each edit button
        editBtn.onclick = (e) => {
            let targetElement = e.target; //gets the clicked element
            //if the icon is clicked(a nested element),we target the parent button
            if (!(e.target.className == "edit")) {
                targetElement = e.target.parentElement; //get back to edit button
            }
            //we get the task text and put it in the span field
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            //remove the ed'ted task from the DOM (the 'task' div that is the parent of the button)
            targetElement.parentNode.remove();
            //reduce the number of tasks by one
            taskCount -= 1;
            //we show the updated task count on the screen
            displayCount(taskCount);
        };
     });
     //choose all checkboks elements
     //this is important to check whether the tasks are completed or not
     const tasksCheck = document.querySelectorAll(".task-check");
     
     //performs an action for each checkbox
     tasksCheck.forEach((checkBox) => {
        //defines an 'onchange' event for each checkbox
        checkBox.onchange = () => {
            //reaches the sibling element next to the checkbox(<-nextElementSibling)
            //(classList.toggle("completed")->)adds or removes the "completed" class to the sibling element
            //the completed class is usually  used to draw a line on the task /in CSS
            checkBox.nextElementSibling.classList.toggle("completed");
            //'f the checkbox is checked, one actions hppens/ if it is not checked,another action happens
            if (checkBox.checked) {
                //if checked, taskCount is reduced by one because the task is completed
                taskCount -= 1;
            } //if not checked, taskCount is increased by one because the task is not completed
            else {
                taskCount += 1;
            }
            //after the updating taskCount 
            displayCount(taskCount);
        };
     });
     //when a new task is added, the number of tasks increases by one
     taskCount += 1;
     //calls a function to display the task count
     displayCount(taskCount);
     //this code clears the input field after adding the task is finished
     newTaskInput.value = "";
};

//it couses the function 'addTask' to run when the button is clicked
addBtn.addEventListener("click", addTask);

//runs a function when the page is loads
window.onload = () => {
    //resets the task count
    taskCount = 0;
    //shows the task count(as zero)
    displayCount(taskCount);
    //clears the input field
    newTaskInput.value = "";
};

//clicking the add button starts the process fo adding a new task
addBtn.addEventListener("click", addTask);