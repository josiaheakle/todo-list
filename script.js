// TODO LIST
// Individual ToDo lists under parent projects
// TODO CLASS : contains date, description, URGENT bool, title, (COLOR), notes, checklist
// PROJECT CLASS : contains array of todo objects 
// 

let projectCounter = 0;
const Project = (titleIn, descrIn = '', dueDateIn = '', todoObjArray = [], colorIn = 'blue-grey') => {

    let id = projectCounter++;
    let title = titleIn;
    let description = descrIn;
    let dueDate = dueDateIn;
    let todoArray = todoObjArray;
    let color = colorIn;

    const addTodo = (todoObj) => {
        todoArray.push(todoObj);
    }

    const getDueDate = () => {
        return dueDate;
    }

    const getDescription = () => {
        return description;
    }

    const getTitle = () => {
        return title;
    }
    
    const getId = () => {
        return id;
    }

    const getColor = () => {
        return color;
    }

    return { todoArray, addTodo, getDueDate, getDescription, getTitle, getId }

}

const Todo = (titleIn, descrIn ='', dueDateIn='', urgentIn=false) => {
    // TITLE - summary of todo
    // DATE  - due date
    // DESCRIPTION - description of todo
    // URGENT - bool
    let title = titleIn;
    let dueDate = dueDateIn;
    let description = descrIn;
    let urgent = urgentIn;
    let completed = false;
    let tasks = [];

    const setUrgent = (bool) => {
        urgent = bool;
    }
    const getUrgent = () => {
        return urgent;
    }
    const getDueDate = () => {
        return dueDate;
    }
    const getDescription = () => {
        return description;
    }
    const getTitle = () => {
        return title;
    }
    const addTasks = (tasksIn) => {
        tasks = tasksIn;
    }
    return { setUrgent, getUrgent, getDueDate, getDescription, getTitle, addTasks, tasks, completed }

}


// function ProjectListItem (project) {
//     const projId = project.getId();
//     return (
//         <li id={`project-list-${projId}`}>
//             <div id={`project-header-${projId}`} class={`collapsible-header blue-grey darken-2`}>
//                 {project.getTitle}
//                 <div id={`project-body-${projId}`} class={`collapsible-body blue-grey darken-3`}>
//                     <div class={`row`}>
//                         <span class={`col s8`}>
//                             {project.getDescription()}
//                         </span>
//                         <span class={`col s4`}>
//                             <span class={`left`}> 
//                                 {`Due Date:`}
//                             </span>
//                             <span class={`right`}>
//                                 {project.getDueDate()}
//                             </span>
//                             <span class={`left`}> 
//                                 {`# of ToDos: `}
//                             </span>
//                             <span class={`right`}>
//                                 {project.todoArray.length}
//                             </span>
//                         </span>

//                     </div>
//                     <a href={'#'} id={projId} class={'open-project-button wave-effect waves-light btn red center'}>{`Open`}</a>
//                 </div>
//             </div>
//         </li>
//     )
// }



// PROJECT MANAGER ================================================= PROJECT MANAGER
const ProjectManager = (function() {

    // ARRAY OF PROJECTS - this should be updated when login function is created
    let projects = [];
    // Index of which project is being used
    let currentProj = 0;

    // Creates a default project
    const makeDefaultProject = () => {
        const defaultTodo = Todo('Make a To-Do list', 'click the + to make a new todo list', 'n/a', true)
        const defaultProject = Project('Default Project', "Placeholder project", "", [defaultTodo])
        return defaultProject;
    }

    // Call when creating a new project
    const addProject = (proj) => {
        projects.push(proj);
    }
    

    const showAllProjects = () => {
        DOMController.printProjects(projects)
    }

    const getProjIndex = (proj) => {
        let i=0
        let properIndex = -1
        projects.forEach(project => {
            if(proj.getId() == project.getId()) {
                properIndex = i;
                
            }
            i++
        })
        return properIndex

    }

    const getCurrentProj = () => {
        return currentProj;
    }

    // Shows all the todos within a project
    const openProject = (proj) => {
        currentProj = getProjIndex(proj);
        console.log(currentProj)
        DOMController.openProject(proj)
    }

    return {
        projects, projects,
        getCurrentProj: getCurrentProj,
        makeDefaultProject: makeDefaultProject,
        showAllProjects: showAllProjects,
        addProject: addProject,
        openProject: openProject,
        getProjIndex: getProjIndex,
    }

})();

// DOM CONTROLLER ================================================= DOM CONTROLLER
const DOMController = (function() {

    // DOM Elements to only load once

    // TODO FORM ELEMENTS
    const newTodoForm = document.querySelector('#new-todo-form')
    const formTitle = newTodoForm.querySelector('#form-title')
    const formDescription = newTodoForm.querySelector('#form-descr')
    const formDueDate = newTodoForm.querySelector('#form-due-date')
    const formUrgent = newTodoForm.querySelector('#form-urgent')
    const formSubmit = newTodoForm.querySelector('#form-submit')

    const formCheckCont = newTodoForm.querySelector('#checkbox-container')

    const newProjForm = document.querySelector('#new-project-form')
    const projFormTitle = newProjForm.querySelector('#form-title')
    const projFormDescription = newProjForm.querySelector('#form-descr')
    const projFormDueDate = newProjForm.querySelector('#form-due-date')
    const projFormColor = document.getElementsByName('color-radio')

    const projFormSubmit = newProjForm.querySelector('#form-submit')

    const checkboxCont = newTodoForm.querySelector('#checkbox-container')
    const taskInput = newTodoForm.querySelector('#form-checkist-item')
    const taskLabel = newTodoForm.querySelector('#task-label')


    // PROJECTS ARRAY ELEMENT
    const projsCont = document.querySelector('#projects-container')
    const projsAccor = document.querySelector('#project-accordian')
    const projBreadcrumb = document.querySelector('#project-breadcrumb')

    // OPEN PROJECT CONTAINER 
    const projCont = document.querySelector('#open-project')
    const projTitle = projCont.querySelector('#project-title')
    const projDescr = projCont.querySelector('#project-description')
    const projDate = projCont.querySelector('#project-date')
    const projTodos = projCont.querySelector('#todos-container')


    let todoIndex = 0;




    // PROJECT DOM ====================================== PROJECT DOM


    // PRINTS ALL PROJECT FROM PROJECT ARRAY TO THE DOM
    const printProjects = (projArray) => {
        _clearProjects();
        _closeProject();
        closeProjForm();
        projArray.forEach(proj => {
            _createProjectListItem(proj)
        })
    }

    let tasks = [];
    let taskIndex = 2;

    const _clearTaskArray = () => {
        taskLabel.textContent = 'Task #1'
        tasks = [];
        taskIndex = 2;
    }

    const _clearTaskInput = () => {
        taskInput.value = ''
    }

    const addNewTask = () => {
        
        if(taskInput.value != '') {
            tasks.push(taskInput.value)
            taskLabel.textContent = `Task #${taskIndex++}`
            _clearTaskInput();
        } else {
            M.toast({html: 'Cannot add an empty task!'})
        }

        


    }

    // CLEARS PROJECTS FROM PROJECT ACCORDIAN
    const _clearProjects = () => {
        let bool = false;
        do {
            const projDiv = projsAccor.querySelector('li')
            if(projDiv != undefined) {
                projsAccor.removeChild(projDiv)
            } else {
                bool = true;
            }
        } while (!bool);
    }


    // CREATES ONE LI ELEMENT FOR PROJECTS ACCORDIAN
    const _createProjectListItem = (proj) => {

        const id = proj.getId()

        const listElem = document.createElement('li')
        listElem.id = `project-list-${id}`
        
        const projHeader = document.createElement('div')
        projHeader.id = `project-header-${id}`
        projHeader.className = 'collapsible-header blue-grey darken-2'
        projHeader.textContent = `${proj.getTitle()}`

        listElem.appendChild(projHeader)

        const projBody = document.createElement('div')
        projBody.id = `project-body-${id}`
        projBody.className = "collapsible-body blue-grey darken-3 row no-mar-bot"

        const projBodyDiv = document.createElement('div')
        projBodyDiv.className = 'row'

        const projBodySpan = document.createElement('span')
        projBodySpan.className = 'col s8'
        projBodySpan.textContent = `${proj.getDescription()}`
        projBodyDiv.appendChild(projBodySpan)



        const projDueSpan = document.createElement('div')
        projDueSpan.className = 'col s4 row'

        const projDueSpanLeft = document.createElement('span')
        projDueSpanLeft.className = 'left'
        projDueSpanLeft.textContent = 'Due Date:'

        const projDueSpanRight = document.createElement('span')
        projDueSpanRight.className = 'right'
        projDueSpanRight.textContent = `${(proj.getDueDate()=='')?'n/a':proj.getDueDate()}`

        const br = document.createElement('br');

        projDueSpan.appendChild(projDueSpanLeft)
        projDueSpan.appendChild(projDueSpanRight)

        projDueSpan.appendChild(br)

        const projTodoAmtSpanLeft = document.createElement('span')
        projTodoAmtSpanLeft.className = 'left'
        projTodoAmtSpanLeft.textContent = '# of ToDos:'

        const projTodoAmtSpanRight = document.createElement('span')
        projTodoAmtSpanRight.className = 'right'
        projTodoAmtSpanRight.textContent = ` ${proj.todoArray.length}`


        projDueSpan.appendChild(projTodoAmtSpanLeft)
        projDueSpan.appendChild(projTodoAmtSpanRight)

        // projDueSpan.appendChild(projOpenButton)


        // <a class="waves-effect waves-light btn">button</a>


        projBodyDiv.appendChild(projDueSpan)

        projBody.appendChild(projBodyDiv)
        listElem.appendChild(projBody)

        const projOpenButton = document.createElement('a')
        projOpenButton.id = proj.getId();
        projOpenButton.className = 'open-project-button wave-effect waves-light btn center col s8 offset-s2'
        projOpenButton.textContent = 'Open'

        projBody.appendChild(projOpenButton)
        
        projsAccor.appendChild(listElem)





    }


    // OPENS INDIVIDUAL PROJECT
    const openProject = (proj) => {
        _clearProjectCont();
        _createProjectBreadcrumb(proj);
        _clearTaskArray();
        closeTodoForm();


        projsCont.hidden = true;
        projCont.hidden = false;
        projTodos.hidden = false;

        projTitle.textContent = proj.getTitle();
        projDescr.textContent = proj.getDescription();
        projDate.textContent = proj.getDueDate();

        _clearProjectTodos()
        proj.todoArray.forEach(todo => {
            printTodo(todo)
        });
    }

    const _createProjectBreadcrumb = (proj) => {
        projBreadcrumb.hidden = false;
        projBreadcrumb.textContent = proj.getTitle();
    }

    // CLOSES INDIVIDUAL PROJECT, AND OPENS PROJECT ACCORDIAN
    const _closeProject = () => {
        projBreadcrumb.hidden = true;
        projsCont.hidden = false;
        projCont.hidden = true;
        projTodos.hidden = true;
    }

    
    const _clearProjectCont = () => {
        projTitle.textContent = ''
        projDescr.textContent = ''
        projDate.textContent = ''        
    }

    const _clearProjectTodos = () => {
        const todoConts = document.querySelectorAll('.todo-spacer')
        todoConts.forEach(cont => {
            projTodos.removeChild(cont)
        })
    }

    // TODO DOM ========================================= TODO DOM 
    // Creates a new todo container
    
    const _newTodoContainer = () => {

        const spacer = document.createElement('div')
        spacer.className = 'todo-spacer col s6'
        const todoCont = document.createElement('div')
        todoCont.id = `todo-container-${todoIndex++}`
        todoCont.className = `card blue-grey col s12 todo-container center pad-top`
        const todoTitle = document.createElement('span')
        todoTitle.id = 'todo-title'
        todoTitle.className = 'card-title center'
        const todoDescr = document.createElement('p')
        todoDescr.id = 'todo-descr'

        const todoDueDate = document.createElement('p')
        todoDueDate.id = 'todo-due-date'

        

        todoCont.appendChild(todoTitle)
        todoCont.appendChild(todoDescr)
        todoCont.appendChild(todoDueDate)
        // todoCont.appendChild(todoUrgent)
        spacer.appendChild(todoCont)
        projTodos.appendChild(spacer)

    }

    // Print todo to the DOM
    const printTodo = (todo) => {

        _newTodoContainer()
        const todoCont = document.querySelector(`#todo-container-${todoIndex-1}`)


        let strTitle;
        if(todo.getUrgent()) {
            console.log(todoCont.classList)
            todoCont.classList.forEach(li => {
                if(li == 'blue-grey') {
                    console.log(`change`)
                    // todoCont.classList.remove(li)
                    // todoCont.classList.add('red')
                } 
            })
            // todoCont.className = `${todoCont.className} red`
        } 

        const todoTitle = todoCont.querySelector('#todo-title')
        const todoDescr = todoCont.querySelector('#todo-descr')
        // const todoUrgent = todoCont.querySelector('#todo-urgent')
        const todoDueDate = todoCont.querySelector('#todo-due-date')
        
        todoTitle.textContent = todo.getTitle();
        todoDescr.textContent = todo.getDescription();
        // todoUrgent.checked = todo.getUrgent();
        todoDueDate.textContent = todo.getDueDate();
    }

    // Clear all values in todo form
    const _clearTodoForm = () => {

        _clearTaskArray();
        formTitle.value = '';
        formDescription.value = '';
        formUrgent.checked = false;
    }

    // Show new todo form
    const showTodoForm = () => {
        _clearTodoForm();
        newTodoForm.hidden = false;
    }

    // Hide new todo form
    const closeTodoForm = () => {
        newTodoForm.hidden = true;
        _clearTodoForm();
    }

    const _getProjColorFromRadio = () => {
        projFormColor.forEach(radio => {
            if(radio.checked) {
                return radio.value;
            }
        });
    }

    const showProjForm = () => {
        newProjForm.hidden = false;

    }

    const closeProjForm = () => {
        newProjForm.hidden = true;

    }

    // Save todo - no call, adds listener to submit button
    const _getTodoFromForm = (function() {
        formSubmit.addEventListener('click', function() {
            // MAKE TODO
            if(formTitle.value != '') {
                let todo = Todo(formTitle.value, formDescription.value, formDueDate.value, formUrgent.checked)
                todo.addTasks(tasks)

                // ADD TODO TO PROJECT
                ProjectManager.projects[ProjectManager.getCurrentProj()].addTodo(todo);
                ProjectManager.openProject(ProjectManager.projects[ProjectManager.getCurrentProj()])
                closeTodoForm();
            } else {
                M.toast({html: 'Cannot make a todo with a blank title!'})
            }

        });
    })();

    const _getProjFromForm = (function() {
        projFormSubmit.addEventListener('click', function() {
            if(projFormTitle.value != '') {
                let proj = Project(projFormTitle.value, projFormDescription.value, projFormDueDate.value, [], _getProjColorFromRadio())
                ProjectManager.addProject(proj)
                ProjectManager.openProject(ProjectManager.projects[ProjectManager.getProjIndex(proj)])
                closeProjForm();
            } else {
                M.toast({html: 'Cannot make a project with a blank title!'})
            }
        })
    })();

    return {
        printTodo: printTodo,
        showTodoForm: showTodoForm,
        closeTodoForm: closeTodoForm,
        openProject: openProject,
        printProjects: printProjects,
        showProjForm: showProjForm,
        closeProjForm: closeProjForm,
        addNewTask: addNewTask,
    }

})();

const InitMaterialize = (function() {
    document.addEventListener('DOMContentLoaded', function() {

        var collapsibleElements = document.querySelectorAll('.collapsible');
        var collapsibleInstances = M.Collapsible.init(collapsibleElements);

    });
})();

const AppHandler = (function() {

    const defaultProject = ProjectManager.makeDefaultProject();
    ProjectManager.addProject(defaultProject);
    ProjectManager.showAllProjects();




})();



const ButtonListener = (function() {

    const homeButton = document.querySelector('#home-link')
    const newTodoButton = document.querySelector('#new-todo-btn')
    const closeTodoButton = document.querySelector('#close-todo-btn')
    const newProjButton = document.querySelector('#new-project-btn')
    const closeProjButton = document.querySelector('#close-project-btn')
    const newTaskButton = document.querySelector('#new-task-btn')

    let openProjectButtons = document.querySelectorAll('.open-project-button')

    const _reloadButtons = () => {
        openProjectButtons = document.querySelectorAll('.open-project-button')
        openProjectButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                console.log(`clicks`)
                ProjectManager.projects.forEach(proj => {
                    if(proj.getId() == btn.id) {
                        ProjectManager.openProject(proj)
                    }
                })
            })
        })
    }

    newTaskButton.addEventListener('click', function() {
        DOMController.addNewTask();
    });

    newProjButton.addEventListener('click', function() {
        DOMController.showProjForm();
    });

    closeProjButton.addEventListener('click', function() {
        DOMController.closeProjForm();
    });

    newTodoButton.addEventListener('click', function() {
        DOMController.showTodoForm();
    });

    closeTodoButton.addEventListener('click', function() {
        DOMController.closeTodoForm();
    })

    homeButton.addEventListener('click', function() {
        ProjectManager.showAllProjects();
        _reloadButtons();
    })

    _reloadButtons();

})();



