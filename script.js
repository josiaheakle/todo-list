// TODO LIST
// Individual ToDo lists under parent projects
// TODO CLASS : contains date, description, URGENT bool, title, (COLOR), notes, checklist
// PROJECT CLASS : contains array of todo objects 
// 

const Project = (title, description, dueDate, todoObjArray = []) => {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.todoArray = todoObjArray;

    const addTodo = (todoObj) => {
        todoArray.push(todoObj);
    }

    const getDueDate = () => {
        return this.dueDate;
    }

    const getDescription = () => {
        return this.description;
    }

    const getTitle = () => {
        return this.title;
    }

    return { todoArray, addTodo, getDueDate, getDescription, getTitle }


}

const Todo = (title, description, dueDate, urgent) => {
    // TITLE - summary of todo
    // DATE  - due date
    // DESCRIPTION - description of todo
    // URGENT - bool
    this.title = title;
    this.dueDate = dueDate;
    this.description = description;
    this.urgent = urgent;

    const setUrgent = (bool) => {
        this.urgent = bool;
    }
    const getUrgent = () => {
        return this.urgent;
    }
    const getDueDate = () => {
        return this.dueDate;
    }
    const getDescription = () => {
        return this.description;
    }
    const getTitle = () => {
        return this.title;
    }
    return { setUrgent, getUrgent, getDueDate, getDescription, getTitle, }

}
const ProjectManager = (function() {
    let projects = [];
    let currentProj = 0;

    const makeDefaultProject = () => {
        const defaultTodo = Todo('Make a To-Do list', 'Make a To-Do list', Date.now(), true)
        const defaultProject = Project('Default Project', "A default project", Date.now(), [defaultTodo])
        return defaultProject;
    }

    const addProject = (proj) => {
        projects.push(proj);
    }

    return {
        projects: projects,
        makeDefaultProject: makeDefaultProject,
        addProject: addProject,
        currentProj: currentProj,
    }

})();

const DOMController = (function() {

    const printTodo = (todo) => {
        const todoTitle = document.querySelector('#todo-title')
        const todoDescr = document.querySelector('#todo-descr')
        const todoUrgent = document.querySelector('#todo-urgent')
        todoTitle.textContent = todo.getTitle();
        todoDescr.textContent = todo.getDescription();
        todoUrgent.checked = todo.getUrgent();
    }

    const getTodoFromForm = () => {
        const newTodoForm = document.querySelector('#new-todo-form')
        const formTitle = document.querySelector('#form-title')
        const formDescription = document.querySelector('#form-descr')
        const formUrgent = document.querySelector('#form-urgent')
        const formSubmit = document.querySelector('#form-submit')

        formSubmit.addEventListener('click', function() {
            // MAKE TODO
            let todo = Todo(formTitle, formDescription, '', formUrgent)
            // ADD TODO TO PROJECT
            ProjectManager.projects[ProjectManager.currentProj].addTodo(todo);

        });
    }



})();

const AppHandler = (function() {

    // Init default project
    const defaultProject = ProjectManager.makeDefaultProject();
    ProjectManager.addProject(defaultProject);
    DOMController.printTodo(defaultProject.todoArray[0])



})();

const TodoHandler = (function(){

})();



