// DOM CONTROLLER ================================================= DOM CONTROLLER
const DOMController = (function() {

    // DOM Elements to only load once

    // TODO FORM ELEMENTS
    const newTodoForm = document.querySelector('#new-todo-form')
    const formTitle = newTodoForm.querySelector('#form-title')
    const formDescription = newTodoForm.querySelector('#form-descr')
    const formDueDate = newTodoForm.querySelector('#form-due-date')
    const formUrgent = newTodoForm.querySelector('#form-urgent')

    // PROJECT FORM ELEMENTS
    const newProjForm = document.querySelector('#new-project-form')
    const projFormTitle = newProjForm.querySelector('#form-title')
    const projFormDescription = newProjForm.querySelector('#form-descr')
    const projFormDueDate = newProjForm.querySelector('#form-due-date')
    const projFormColor = document.getElementsByName('color-radio')
    const projFormSubmit = newProjForm.querySelector('#form-submit')


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



    // PROJECT DOM ====================================== PROJECT DOM


    // PRINTS ALL PROJECT FROM PROJECT ARRAY TO THE DOM
    const printProjects = (projArray) => {
        _clearProjects();
        _closeProject();
        closeProjForm();
        projArray.forEach(proj => {
            _createProjectListItem(proj)
        })
        resizeElements()
    }

    // OPENS INDIVIDUAL PROJECT
    const openProject = (proj) => {
        _clearProjectCont();
        _createProjectBreadcrumb(proj);
        closeTodoForm();

        // const deleteComTodoBtn = document.querySelector('#delete-complete-todos')
        // if(proj.getTodoArray().length > 0) deleteComTodoBtn.hidden = false;
        // else deleteComTodoBtn.hidden = true;

        projsCont.hidden = true;
        projCont.hidden = false;
        projTodos.hidden = false;

        projTitle.textContent = proj.getTitle();
        projDescr.textContent = proj.getDescr();
        if(proj.getDueDate() != '') {
            projDate.textContent = `Due: ${proj.getDueDate()}`
        }

        let renderbtn = false;
        _clearProjectTodos()
        proj.getTodoArray().forEach(todo => {
            printTodo(todo)
            if(todo.getComplete()) {
                renderbtn = true;
            }
        });
        if (renderbtn) {

        }
    }


    // CLOSES INDIVIDUAL PROJECT, AND OPENS PROJECT ACCORDIAN
    const _closeProject = () => {
        projBreadcrumb.hidden = true;
        projsCont.hidden = false;
        projCont.hidden = true;
        projTodos.hidden = true;
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

    const _clearProjectCont = () => {
        projTitle.textContent = ''
        projDescr.textContent = ''
        projDate.textContent = ''        
    }

    const resizeElements = () => {
        const rmvProjBtns = document.querySelectorAll(`.remove-project-button`)
        const openProjBtns = document.querySelectorAll(`.open-project-button`)

        const width = window.innerWidth;
        console.log(width)

        for(let i=0; i<rmvProjBtns.length;i++) {
            if(width < 500) {
                rmvProjBtns[i].classList.remove('s3')
                rmvProjBtns[i].classList.remove('offset-s2')

                rmvProjBtns[i].classList.add('s5')

                openProjBtns[i].classList.remove('s3')
                // openProjBtn.classList.remove('offset-s2')
                openProjBtns[i].classList.add('s5')
            } else {
                rmvProjBtns[i].classList.add('s3')
                rmvProjBtns[i].classList.add('offset-s2')

                rmvProjBtns[i].classList.remove('s5')

                openProjBtns[i].classList.add('s3')
                // openProjBtn.classList.remove('offset-s2')
                openProjBtns[i].classList.remove('s5')
            }
        }

    }

    // CREATES ONE LI ELEMENT FOR PROJECTS ACCORDIAN
    const _createProjectListItem = (proj) => {

        const id = proj.getId()

        const listElem = document.createElement('li')
        const projHeader = document.createElement('div')
        const projBody = document.createElement('div')
        const projBodyDiv = document.createElement('div')
        const projBodySpan = document.createElement('span')
        const projDueSpan = document.createElement('div')
        const projDueSpanLeft = document.createElement('span')        
        const projDueSpanRight = document.createElement('span')
        const br = document.createElement('br');
        const projTodoAmtSpanLeft = document.createElement('span')
        const projTodoAmtSpanRight = document.createElement('span')
        const projOpenButton = document.createElement('a')
        const projRemoveButton = document.createElement('a')


        // List element under collapsible UL
        listElem.id = `project-list-${id}`

        // Card header
        projHeader.id = `project-header-${id}`
        projHeader.className = 'collapsible-header blue-grey darken-2'
        projHeader.textContent = `${proj.getTitle()}`

        // Card body
        projBody.id = `project-body-${id}`
        projBody.className = "collapsible-body blue-grey darken-3 row no-mar-bot"

        // Span to organize under card body
        projBodyDiv.className = 'row'

        // Span to organize under body div
        projBodySpan.className = 'col s8'
        projBodySpan.textContent = `${proj.getDescr()}`
        projDueSpan.className = 'col s4 row'

        // Span under body span to organize left
        projDueSpanLeft.className = 'left'
        projDueSpanLeft.textContent = 'Due Date:'

        // Span under body span to organize right 
        projDueSpanRight.className = 'right'
        projDueSpanRight.textContent = `${(proj.getDueDate()=='')?'n/a':proj.getDueDate()}`

        // 
        projTodoAmtSpanLeft.className = 'left'
        projTodoAmtSpanLeft.textContent = '# of ToDos:'

        projTodoAmtSpanRight.className = 'right'
        projTodoAmtSpanRight.textContent = ` ${proj.getTodoArray().length}`


        projRemoveButton.id = proj.getId()
        projRemoveButton.className = 'remove-project-button wave-effect waves-light red btn center col s3 offset-s2'
        projRemoveButton.textContent = 'Remove'

        projOpenButton.id = proj.getId();
        projOpenButton.className = 'open-project-button wave-effect waves-light btn center col s3 offset-s2'
        projOpenButton.textContent = 'Open'

        listElem.appendChild(projHeader)
        projBodyDiv.appendChild(projBodySpan)
        projDueSpan.appendChild(projDueSpanLeft)
        projDueSpan.appendChild(projDueSpanRight)
        projDueSpan.appendChild(br)
        projDueSpan.appendChild(projTodoAmtSpanLeft)
        projDueSpan.appendChild(projTodoAmtSpanRight)
        projBodyDiv.appendChild(projDueSpan)
        projBody.appendChild(projBodyDiv)
        listElem.appendChild(projBody)
        projBody.appendChild(projRemoveButton)
        projBody.appendChild(projOpenButton)
        projsAccor.appendChild(listElem)

    }











    const _createProjectBreadcrumb = (proj) => {
        projBreadcrumb.hidden = false;
        projBreadcrumb.textContent = proj.getTitle();
    }



    const editTodo = (todo) => {

        showTodoForm();

        formTitle.value = todo.getTitle()
        formDescription.value = todo.getDescr()
        formDueDate.value = todo.getDueDate()
        formUrgent.checked = todo.getUrgent()


    }



    const verifyAlert = (verifyStr) => {
        const alertCard = document.createElement('div')
        alertCard.id = 'verify-selection-card'
        alertCard.className = 'card blue-grey darken-1 center mar-top'
        alertCard.position = 'absolute'
        
        const alertTitle = document.createElement('')

    }


    const _clearProjectTodos = () => {
        const todoConts = document.querySelectorAll('.todo-container')
        todoConts.forEach(cont => {
            projTodos.removeChild(cont)
        })
    }

    // TODO DOM ========================================= TODO DOM 
    // Creates a new todo container
    let todoIndex = 0;

    const _newTodoContainer = (todo) => {

        // const spacer = document.createElement('div')
        // spacer.className = 'todo-spacer col s6'
        // const todoCont = document.createElement('div')
        // todoCont.id = `todo-container-${todoIndex++}`
        // todoCont.className = `card blue-grey todo-container center pad-top pad-bot`
        // const todoTitle = document.createElement('span')
        // todoTitle.id = 'todo-title'
        // todoTitle.className = 'card-title center'
        // const todoDescr = document.createElement('p')
        // todoDescr.id = 'todo-descr'

        // const todoDueDate = document.createElement('p')
        // todoDueDate.id = 'todo-due-date'



        // todoCont.appendChild(todoTitle)
        // todoCont.appendChild(todoDueDate)

        // todoCont.appendChild(todoDescr)
        // // todoCont.appendChild(todoUrgent)
        // spacer.appendChild(todoCont)
        // projTodos.appendChild(spacer)



        
 


        /*
        <div id="todo-container-0" class="card blue-grey todo-container center pad-top pad-bot">
            <span id="todo-title" class="card-title center">Default todo</span>
            <p id="todo-descr">a default todo</p>
            <div class="row no-pad-bot">
                <a id="0" class="black-text right btn-flat waves-effect waves-light mar-right edit-button">Edit</a>
                <a id="0" class="red-text left btn-flat waves-effect waves-light mar-left remove-button">Remove</a>
            </div>
        </div>
        */

        const todoCont = document.createElement('li')
        todoCont.className = 'blue-grey todo-container collection-item'
        // todoCont.style.height = 'auto'
        todoCont.id = `todo-container-${todo.getId()}`

        const spacer = document.createElement('div')


        const todoTop = document.createElement('div')
        todoTop.className = 'small-pad-bot'
        todoTop.id = 'todo-top'

        const todoTitle = document.createElement('span')
        todoTitle.className = 'center bold' 
        todoTitle.id = 'todo-title'

        const todoDueDate = document.createElement('span')
        todoDueDate.className = 'left'
        todoDueDate.id = 'todo-due-date'
        todoDueDate.style.width = '80px'


        const todoCheckboxPara = document.createElement('p')
        todoCheckboxPara.className = 'right no-mar-top no-mar-bot'
        todoCheckboxPara.style.width = '80px'
        
        const todoCheckboxLabel = document.createElement('label')
        todoCheckboxPara.appendChild(todoCheckboxLabel)
        
        const todoCheckbox = document.createElement('input')
        todoCheckbox.type = 'checkbox'
        todoCheckbox.className = 'filled-in'
        todoCheckbox.id = `checkbox-${todo.getId()}`
        todoCheckboxLabel.appendChild(todoCheckbox)
        const todoCheckboxSpan = document.createElement('span')
        todoCheckboxSpan.className = 'no-pad todo-checkbox'
        todoCheckboxSpan.id = todo.getId()
        // todoCheckboxSpan.style.fontSize = '18px'
        // todoCheckboxSpan.id = 'todo-urgent'
        todoCheckboxLabel.appendChild(todoCheckboxSpan)

        // const breakline = document.createElement('br')

        const spacer2 = document.createElement('div')
        spacer2.className = 'center'
        const todoDescr = document.createElement('p')
        todoDescr.id = 'todo-descr'
        todoDescr.className = 'small-pad-bot'
        spacer2.appendChild(todoDescr)

        // todoDescr.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores alias incidunt illum rem magnam aliquid quibusdam reiciendis atque, aperiam porro dolorum, ratione voluptatem. Ex quisquam aspernatur, nesciunt facilis accusantium unde!'


        const todoFooter = document.createElement('div')
        todoFooter.className = 'row no-pad-bot'
            
        const removeButton = document.createElement('a')
        removeButton.textContent = 'Remove'
        removeButton.id = todo.getId()
        removeButton.className = 'red-text left btn-flat waves-effect waves-light mar-left remove-button' 

        const editButton = document.createElement('a')
        editButton.id = todo.getId()
        editButton.textContent = 'Edit'
        editButton.className = 'black-text right btn-flat waves-effect waves-light mar-right edit-button'
        todoFooter.appendChild(editButton)
 
        todoFooter.appendChild(removeButton)



        todoTop.appendChild(todoTitle)
        todoTop.appendChild(todoDueDate)
        todoTop.appendChild(todoCheckboxPara)

        spacer.appendChild(todoTop)
        // spacer.appendChild(breakline)

        spacer.appendChild(spacer2)
        spacer.appendChild(todoFooter)

        todoCont.appendChild(spacer)
        projTodos.appendChild(todoCont)

    }

    // Print todo to the DOM
    const printTodo = (todo) => {

        _newTodoContainer(todo)
        const todoCont = document.querySelector(`#todo-container-${todo.getId()}`)
        const todoTitle = todoCont.querySelector('#todo-title')
        const todoDescr = todoCont.querySelector('#todo-descr')
        const todoDueDate = todoCont.querySelector('#todo-due-date')
        const todoCheckbox = todoCont.querySelector(`#checkbox-${todo.getId()}`)

        console.log(`TODO(${todo.getTitle()}) - urgent(${todo.getUrgent()}) complete(${todo.getComplete()})`)

        todoTitle.textContent = todo.getTitle();
        todoDescr.textContent = todo.getDescr();
        if(todo.getDueDate() != '') {
            todoDueDate.textContent = `${HelpfulFunctions.formatDate(todo.getDueDate())}`;
        } else { 
            todoDueDate.textContent = '00/00/0000'
        }

        todoCheckbox.checked = (todo.getComplete() == true) ? true: false;

        if(todo.getUrgent() == true) {
            console.log(`urgent`)
            todoCont.classList.remove('blue-grey')
            todoCont.classList.add('red')
            todoCont.classList.add('lighten-3')
        } else {
            todoCont.classList.add('blue-grey')
            todoCont.classList.remove('red')
            todoCont.classList.remove('lighten-3')
        }
    }

    // Clear all values in todo form
    const _clearTodoForm = () => {
        formTitle.value = '';
        formDescription.value = '';
        formDueDate.value = ''
        formUrgent.checked = false;
    }

    // Show new todo form
    const showTodoForm = () => {
        _clearTodoForm();
        newTodoForm.hidden = false;
    }

    // 
    const closeTodoForm = () => {
        newTodoForm.hidden = true;
        _clearTodoForm();
    }

    const getProjColorFromRadio = () => {
        projFormColor.forEach(radio => {
            if(radio.checked) {
                return radio.value;
            }
        });
    }

    const _clearProjectForm = () => {
        projFormTitle.value = ''
        projFormDescription.value = ''
        projFormDueDate.value = ''
        projFormColor.value = ''

    }
    const showProjForm = () => {
        newProjForm.hidden = false;
        _clearProjectForm()
    }

    const closeProjForm = () => {
        newProjForm.hidden = true;

    }

    let oldColor = `blue-grey`

    const colorProject = (color) => {
        const recolorObjects = document.querySelectorAll(`.${oldColor}`)

        console.log(`obj amt: ${recolorObjects.length}`)

        recolorObjects.forEach(obj => {
                obj.classList.remove(oldColor)
                oldColor = color;
                obj.classList.add(color)
        })
    }

    return {
        editTodo: editTodo,
        printTodo: printTodo,
        showTodoForm: showTodoForm,
        closeTodoForm: closeTodoForm,
        openProject: openProject,
        printProjects: printProjects,
        showProjForm: showProjForm,
        closeProjForm: closeProjForm,
        getProjColorFromRadio: getProjColorFromRadio,
        colorProject: colorProject,
        resizeElements: resizeElements,
    }

})();
// Initializes materialize methods
const InitMaterialize = (function() {
    document.addEventListener('DOMContentLoaded', function() {

        var collapsibleElements = document.querySelectorAll('.collapsible');
        var collapsibleInstances = M.Collapsible.init(collapsibleElements);

    });
})();