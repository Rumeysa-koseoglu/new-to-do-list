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
    //it takes the text typed into input field and removes the leading/trailing spaces
    const taskName = newTaskInput.value.trim();
    //it hides the error message before each attempt to add a task
    error.style.display = "none";

    //if the input is empty, it displays an error message after
    // 200 ms and exits the function (return;)
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    // Create the new task HTML
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
    tasksContainer.insertAdjacentHTML("beforeend", task);

    const taskDiv = tasksContainer.lastElementChild; // Get the last task div / selects the newly added task
    const checkBox = taskDiv.querySelector(".task-check");
    const deleteButton = taskDiv.querySelector(".delete");
    const editButton = taskDiv.querySelector(".edit");
    const taskNameSpan = taskDiv.querySelector(".taskname");

    // add click action to delete button
    deleteButton.onclick = () => {
        //if the task is not completed, reduces the taskcount
        if (!checkBox.checked){
            taskCount -= 1;
        }
        //then removes the task from the page
        taskDiv.remove();
        //displays the taskCount
        displayCount(taskCount);
    };

    //the e parameter contains the information of the click event
    editButton.onclick = (e) => {
        //saves the c-exact element (target) that the  user clicked
        //in the targetElement variable
        //if the button was clicked directly, the targetElemment becomes the direct editButton
        let targetElement = e.target;
        //if the user clicks on the icon (<i>) inside the button,
        //e.target becomes an icon instead of a direct button(edit button)
        //in this situation, set the icon's parentElement (yani the actual button)
        //as targetElement
        if (!(e.target.className === "edit")) {
            targetElement = e.target.parentElement;
        }//                 |  .   .   .   .   .   .   .   .   . | -> selects the previous sibiling element of the button (<span class="taskname">)
        newTaskInput.value = targetElement.previousElementSibling.innerText; //takes the name of the task with innerText 
        //reaches the button's parent <div class="task"> element.
        //removes this item completely with .remove
        targetElement.parentNode.remove();
        taskCount -= 1;
        displayCount(taskCount);
    };

    // Handle/process checkbox change (when checkbox is clicked)
    checkBox.onchange = () => {
        //strikes out the text by adding the "completed" class
        checkBox.nextElementSibling.classList.toggle("completed");
        //if checked/marked, taskCount is reduces/decreases by one because the task is completed
        if (checkBox.checked) {
            taskCount -= 1;
        } else {     //if unchecked taskCount is increases by one because the task is becomes active again
            taskCount += 1;
        }
        displayCount(taskCount);
    };

    // Make the task div clickable to toggle/change checkbox (even if the checkbox itself is not clicked)
    taskDiv.addEventListener("click", function (e) {
        // Only toggle(change the checkbox status ) if the target is not the edit or delete button
        if (e.target !== editButton && e.target !== deleteButton && e.target !== checkBox) {
            checkBox.checked = !checkBox.checked;
            taskDiv.classList.toggle("completed");

            if (checkBox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }
            displayCount(taskCount);
        }
    });

    taskCount += 1;
    displayCount(taskCount);
    newTaskInput.value = "";
};

//run addTask function when user clicks "add" button
addBtn.addEventListener("click", addTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};
