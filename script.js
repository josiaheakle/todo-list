// TODO LIST
// Individual ToDo lists under parent projects
// TODO CLASS : contains date, description, URGENT bool, title, (COLOR), notes, checklist
// PROJECT CLASS : contains array of todo objects 
// 

const Project = (titleIn, descrIn = '', dueDateIn = '', todoObjArray = []) => {

    let title = titleIn;
    let description = descrIn;
    let dueDate = dueDateIn;
    let todoArray = todoObjArray;

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

    return { todoArray, addTodo, getDueDate, getDescription, getTitle }

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
    return { setUrgent, getUrgent, getDueDate, getDescription, getTitle, completed }

}

// PROJECT MANAGER ================================================= PROJECT MANAGER
const ProjectManager = (function() {

    // ARRAY OF PROJECTS - this should be updated when login function is created
    let projects = [];
    // Index of which project is being used
    let currentProj = 0;

    // Creates a default project
    const makeDefaultProject = () => {
        const defaultTodo = Todo('Make a To-Do list', 'Make a To-Do list', Date.now(), true)
        const defaultProject = Project('Default Project', "A default project", Date.now(), [defaultTodo])
        return defaultProject;
    }

    // Call when creating a new project
    const addProject = (proj) => {
        projects.push(proj);
    }
    

    const showAllProjects = () => {
        DOMController.printProjects(projects)
    }


    // Shows all the todos within a project
    const openProject = (projectNum) => {
        currentProj = projectNum;
        DOMController.openProject(projects[projectNum])
    }

    return {
        projects, projects,
        makeDefaultProject: makeDefaultProject,
        showAllProjects: showAllProjects,
        addProject: addProject,
        openProject: openProject,
    }

})();

// DOM CONTROLLER ================================================= DOM CONTROLLER
const DOMController = (function() {

    // DOM Elements to only load once

    // TODO FORM ELEMENTS
    const newTodoForm = document.querySelector('#new-todo-form')
    const formTitle = newTodoForm.querySelector('#form-title')
    const formDescription = newTodoForm.querySelector('#form-descr')
    const formUrgent = newTodoForm.querySelector('#form-urgent')
    const formSubmit = newTodoForm.querySelector('#form-submit')


    // PROJECTS ARRAY ELEMENT
    const projsCont = document.querySelector('#projects-container')

    // OPEN PROJECT CONTAINER 
    const projCont = document.querySelector('#open-project')
    const projTitle = projCont.querySelector('#project-title')
    const projDescr = projCont.querySelector('#project-description')
    const projDate = projCont.querySelector('#project-date')
    const projTodos = projCont.querySelector('#todos-container')

    let todoIndex = 0;


    // PROJECT DOM ====================================== PROJECT DOM

    let projIndex = 0;
    const _newMenuProjContainer = (titleIn, descrIn, dateIn) => {

        const projDiv = document.createElement('div')
        projDiv.id = `menu-project-container-${projIndex++}`
        projDiv.className = 'menu-project-container'

        const title = document.createElement('h3')
        title.textContent = titleIn;
        title.id = 'menu-project-title'

        const descr = document.createElement('p')
        descr.textContent = descrIn;
        descr.id = 'menu-project-description'

        const dueDate = document.createElement('p')
        dueDate.textContent = dateIn;
        dueDate.id = 'menu-project-due-date'

        // ADD DATE
        projDiv.appendChild(title)
        projDiv.appendChild(descr)
        projDiv.appendChild(dueDate)

        projsCont.appendChild(projDiv)
    }

    const printProjects = (projArray) => {
        _clearProjects();
        _closeProject();
        projArray.forEach(proj => {
            _newMenuProjContainer(proj.getTitle(), proj.getDescription(), proj.getDueDate())
        })
    }

    const _clearProjects = () => {
        let bool = false;
        do {
            const projDiv = projsCont.querySelector('.menu-project-container')
            if(projDiv != undefined) {
                projsCont.removeChild(projDiv)
            } else {
                bool = true;
            }
        } while (!bool);
    }

    const openProject = (proj) => {
        _clearProjectCont();

        projsCont.hidden = true;
        projCont.hidden = false;
        projTodos.hidden = false;

        projTitle.textContent = proj.getTitle();
        projDescr.textContent = proj.getDescription();
        projDate.textContent = proj.getDueDate();

        proj.todoArray.forEach(todo => {
            printTodo(todo)
        });
    }


    const _closeProject = () => {
        projsCont.hidden = false;
        projCont.hidden = true;
        projTodos.hidden = true;
    }

    const _clearProjectCont = () => {
        projTitle.textContent = ''
        projDescr.textContent = ''
        projDate.textContent = ''        
    }

    // TODO DOM ========================================= TODO DOM 
    // Creates a new todo container
    const _newTodoContainer = () => {

        const todoCont = document.createElement('div')
        todoCont.id = `todo-container-${todoIndex++}`
        const todoTitle = document.createElement('h1')
        todoTitle.id = 'todo-title'
        const todoDescr = document.createElement('p')
        todoDescr.id = 'todo-descr'
        const todoUrgent = document.createElement('input')
        todoUrgent.id = 'todo-urgent'
        todoUrgent.type = 'checkbox'
        todoUrgent.disabled = true;
        todoCont.appendChild(todoTitle)
        todoCont.appendChild(todoDescr)
        todoCont.appendChild(todoUrgent)
        projCont.appendChild(todoCont)

    }

    // Print todo to the DOM
    const printTodo = (todo) => {
        _newTodoContainer()
        const todoCont = document.querySelector(`#todo-container-${todoIndex-1}`)
        const todoTitle = todoCont.querySelector('#todo-title')
        const todoDescr = todoCont.querySelector('#todo-descr')
        const todoUrgent = todoCont.querySelector('#todo-urgent')
        todoTitle.textContent = todo.getTitle();
        todoDescr.textContent = todo.getDescription();
        todoUrgent.checked = todo.getUrgent();
    }

    // Clear all values in todo form
    const _clearTodoForm = () => {
        formTitle.value = '';
        formDescription.value = '';
        formUrgent.checked = false;
    }

    // Show new todo form
    const showTodoForm = () => {
        newTodoForm.hidden = false;
    }

    // Hide new todo form
    const closeTodoForm = () => {
        newTodoForm.hidden = true;
        _clearTodoForm();
    }

    // Save todo - no call, adds listener to submit button
    const _getTodoFromForm = (function() {
        formSubmit.addEventListener('click', function() {
            // MAKE TODO
            let todo = Todo(formTitle.value, formDescription.value, '', formUrgent.checked)
            // ADD TODO TO PROJECT
            ProjectManager.projects[ProjectManager.currentProj].addTodo(todo);
            printTodo(ProjectManager.projects[ProjectManager.currentProj].todoArray[0])

        });
    })();

    return {
        printTodo: printTodo,
        showTodoForm: showTodoForm,
        closeTodoForm: closeTodoForm,
        openProject: openProject,
        printProjects: printProjects,
    }

})();

const AppHandler = (function() {

    // Init default project
    const defaultProject = ProjectManager.makeDefaultProject();
    ProjectManager.addProject(defaultProject);
    ProjectManager.addProject(defaultProject);
    ProjectManager.showAllProjects();

    ProjectManager.openProject(0)

    ProjectManager.showAllProjects();



})();




