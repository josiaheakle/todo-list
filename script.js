
const HelpfulFunctions = (function() {

    const formatDate = (dateStr) => {

        let dateArray = dateStr.split('-')
        let str = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
        return str;
        
    
    }

    return {
        formatDate: formatDate,
    }

})();



// PROJECT MANAGER ================================================= PROJECT MANAGER
const ProjectManager = (function() {

    // ARRAY OF PROJECTS
    let projects = [];

    // Index of which project is currently open
    let currentProj = -1;

    // Call when creating a new project
    const addProject = (proj) => {
        projects.push(proj);
        saveProject(proj)
    }
    
    // Shows all projects on DOM
    const showAllProjects = () => {
        DOMController.printProjects(projects)
    }

    // Shows all the todos within a project
    const openProject = (proj) => {
        currentProj = getProjIndex(proj);
        DOMController.openProject(proj)
    }

    // returns currentProj
    const getCurrentProj = () => {
        return currentProj;
    }

    const removeProject = (projectId) => {

        for(let i=0; i<projects.length; i++) {
            if(projects[i].getId() == projectId) {
                projects.splice(i, 1);
            }
        }

        FileManager.saveProjectArray(projects);
        DOMController.printProjects(projects)

    }

    const saveProject = (proj) => {
        FileManager.saveProject(proj)
    }

    const setProjects = (projArray) => {
        projects = projArray
    }

    // let todoEdit = false
    const editTodo = (todoId) => {

        console.log(`edit todo called for id: ${todoId}`)
        
        todo = projects[getCurrentProj()].getTodoFromId(todoId)
        projects[currentProj].removeTodo(todoId)
        openProject(projects[currentProj])
        DOMController.editTodo(todo)
  
        
    }

    const removeCompleteTodos = () => {


        for(let i=0; i<getProjects()[getCurrentProj()].getTodoArray().length; i++) {
            console.log(`CHECKING TODO: ${getProjects()[getCurrentProj()].getTodoArray()[i].getTitle()} | ${getProjects()[getCurrentProj()].getTodoArray()[i].getComplete()}`)
            if(getProjects()[getCurrentProj()].getTodoArray()[i].getComplete()) {
                getProjects()[getCurrentProj()].removeTodo(getProjects()[getCurrentProj()].getTodoArray()[i].getId())
                i--;
            }
        }

        FileManager.saveProject(getProjects[getCurrentProj()])
        openProject(getProjects()[getCurrentProj()])

    }

    // Gets the index within projects[] of the project
    // or returns -1 if project is not found
    const getProjIndex = (proj) => {
        for(let i =0; i<projects.length; i++){
            if(proj.getId() == projects[i].getId()) return i
        }
    }

    const getTodoEditBool = () => {
        return todoEdit;
    }


    function loadProjectsFromStorage() {
        let data = FileManager.loadAllProjects()
        // console.log(data)
        setProjects(_convertDataToProjects(data))
        
        if(projects.length == 0) {
            addProject(_makeDefaultProject())
        }
    }

    function _makeDefaultProject() {
        defaultProj = Project('Default Project', 'A default project', '')
        defaultTodo = Todo('Default todo', 'Click the plus icon to create a new todo.', '', false, false)
        defaultProj.addTodo(defaultTodo)
        return defaultProj
    }

    // converts string of data back to projects 
    function _convertDataToProjects(projectData) {
        let projectArray = []
        projectData.forEach(data => {
            let openIndex = data.indexOf('{')
            let closeIndex = data.indexOf('}')
            let todoData = data.slice(closeIndex+1, data.length)
            let todoAmt = data.slice(openIndex+1, closeIndex)
            let todoArray = []
            let projStr = data.slice(0,openIndex)
            projStrArray = projStr.split('|')
            projectId = projStrArray[0]
            projectTitle = projStrArray[1]
            projectDescr = projStrArray[2]
            projectDueDate = projStrArray[3]
            // console.log(projectId)
            // console.log(projectTitle)
            // console.log(projectDescr)
            // console.log(projectDueDate)
            let proj = Project(projectTitle, projectDescr, projectDueDate, projectId)
            projectArray.push(proj)
            // console.log(proj.getTitle())
            let todoDataArray = todoData.split('/')
            for(let i=0; i<todoAmt; i++) {
                let dataArray = todoDataArray[i].split('|')
                let todoTitle = dataArray[1]
                let todoId = dataArray[0]
                let todoDescr = dataArray[2]
                let todoDueDate = dataArray[3]
                let todoUrgent = dataArray[4]
                console.log(`URGENT: ${todoUrgent}` )
                let todoComplete = dataArray[5]
                console.log(`COMPLETE: ${todoComplete}`)
                let todo = Todo(todoTitle, todoDescr, todoDueDate, todoUrgent, todoComplete, todoId)
                todoArray.push(todo)
            }
            proj.setTodoArray(todoArray)
        })
        // console.log(projectArray)
        return projectArray
    }

    const getProjects = () => {
        return projects
    }

    return {
        loadProjectsFromStorage: loadProjectsFromStorage,
        getCurrentProj: getCurrentProj,
        removeCompleteTodos: removeCompleteTodos,
        // makeDefaultProject: makeDefaultProject,
        showAllProjects: showAllProjects,
        addProject: addProject,
        openProject: openProject,
        saveProject: saveProject,
        removeProject: removeProject,
        editTodo: editTodo,
        getProjIndex: getProjIndex,
        getTodoEditBool: getTodoEditBool,
        getProjects: getProjects,
    }

})();



// BUTTON AND EVENT HANDLERS
const ButtonListener = (function() {

    const homeButton = document.querySelector('#home-link')
    const newTodoButton = document.querySelector('#new-todo-btn')
    const closeTodoButton = document.querySelector('#close-todo-btn')
    const newProjButton = document.querySelector('#new-project-btn')
    const closeProjButton = document.querySelector('#close-project-btn')

    const reloadButtons = () => {

        const todoCheckboxes = document.querySelectorAll('.todo-checkbox')
        todoCheckboxes.forEach(chk => {
            chk.addEventListener('click', function() {
                const chkbox = document.querySelector(`#checkbox-${chk.id}`)
                ProjectManager.getProjects()[ProjectManager.getCurrentProj()].getTodoFromId(chk.id).setComplete(!chkbox.checked)
                ProjectManager.saveProject(ProjectManager.getProjects()[ProjectManager.getCurrentProj()])
            })
        })

        const removeProjectButtons = document.querySelectorAll('.remove-project-button')
        removeProjectButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                ProjectManager.removeProject(btn.id)
                reloadButtons()
            })
        })


        const editButtons = document.querySelectorAll('.edit-button')
        editButtons.forEach(btn => {

            btn.onclick = function() {
                DOMController.closeTodoForm();
                console.log(btn.id)
                ProjectManager.editTodo(btn.id)
                reloadButtons();
            }


        })


        const removeButtons = document.querySelectorAll('.remove-button')
        removeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                ProjectManager.getProjects()[ProjectManager.getCurrentProj()].removeTodo(btn.id)
                ProjectManager.openProject(ProjectManager.getProjects()[ProjectManager.getCurrentProj()])
                reloadButtons()
            });
        });

        const openProjectButtons = document.querySelectorAll('.open-project-button')
        openProjectButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // console.log(`PROJECTS: ${ProjectManager.getProjects()}`)
                // console.log(`BUTTON ID: ${btn.id}`)
                ProjectManager.getProjects().forEach(proj => {
                    if(proj.getId() == btn.id) {
                        ProjectManager.openProject(proj)
                        reloadButtons()
                    }
                });
            });
        })
      


    }

    const newTodoForm = document.querySelector('#new-todo-form')
    const formTitle = newTodoForm.querySelector('#form-title')
    const formDescription = newTodoForm.querySelector('#form-descr')
    const formDueDate = newTodoForm.querySelector('#form-due-date')
    const formUrgent = newTodoForm.querySelector('#form-urgent')
    const formSubmit = newTodoForm.querySelector('#form-submit')


    formSubmit.addEventListener('click', function() {

        if(formTitle.value != '') {
            let todo = Todo(formTitle.value, formDescription.value, formDueDate.value, formUrgent.checked)



            ProjectManager.getProjects()[ProjectManager.getCurrentProj()].addTodo(todo);
            FileManager.saveProjectArray(ProjectManager.getProjects())
            ProjectManager.openProject(ProjectManager.getProjects()[ProjectManager.getCurrentProj()])
            DOMController.closeTodoForm();
            reloadButtons()
        } else {
            M.toast({html: 'Cannot make a todo with a blank title!'})
        }

    });

    const newProjForm = document.querySelector('#new-project-form')
    const projFormTitle = newProjForm.querySelector('#form-title')
    const projFormDescription = newProjForm.querySelector('#form-descr')
    const projFormDueDate = newProjForm.querySelector('#form-due-date')
    const projFormSubmit = newProjForm.querySelector('#form-submit')

    projFormSubmit.addEventListener('click', function() {
        if(projFormTitle.value != '') {
            let projDate = ''
            if(projFormDueDate.value != '') {
                projDate = HelpfulFunctions.formatDate(projFormDueDate.value)
            }
            let proj = Project(projFormTitle.value, projFormDescription.value, projDate)

            // console.log(`TITLE: ${proj.getTitle()} DESCR: ${proj.getDescr()} ID: ${proj.getId()}`)

            ProjectManager.addProject(proj)
            ProjectManager.openProject(ProjectManager.getProjects()[ProjectManager.getProjIndex(proj)])
            DOMController.closeProjForm();
            reloadButtons()
        } else {
            M.toast({html: 'Cannot make a project with a blank title!'})
        }
    })




    newProjButton.addEventListener('click', function() {
        DOMController.showProjForm();
        reloadButtons();

    });

    closeProjButton.addEventListener('click', function() {
        DOMController.closeProjForm();
        reloadButtons();

    });

    newTodoButton.addEventListener('click', function() {
        DOMController.closeTodoForm();
        DOMController.showTodoForm();
        reloadButtons();

    });

    closeTodoButton.addEventListener('click', function() {


        DOMController.closeTodoForm();
        reloadButtons();
    

    });

    homeButton.addEventListener('click', function() {
        ProjectManager.showAllProjects();
        ProjectManager.saveProject(ProjectManager.getProjects()[ProjectManager.getCurrentProj()]);
        reloadButtons();
    });

    const deleteCompleteTodosBtn = document.querySelector('#delete-complete-todos')
    deleteCompleteTodosBtn.addEventListener('click', ProjectManager.removeCompleteTodos)

    document.addEventListener('resize', DOMController.resizeElements)

    document.addEventListener('DOMContentLoaded', function() {
        ProjectManager.loadProjectsFromStorage();
        // console.log(ProjectManager.getProjects())
        ProjectManager.showAllProjects()

        reloadButtons();
        DOMController.resizeElements();

    });

    return {
        reloadButtons: reloadButtons,
    }

})();

// CENTRAL APP HANDLER
const AppHandler = (function() {

    // const defaultProject = ProjectManager.makeDefaultProject();
    // ProjectManager.addProject(defaultProject);
    // ProjectManager.showAllProjects();




})();