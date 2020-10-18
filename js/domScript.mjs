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

        projsCont.hidden = true;
        projCont.hidden = false;
        projTodos.hidden = false;

        projTitle.textContent = proj.getTitle();
        projDescr.textContent = proj.getDescr();
        if(proj.getDueDate() != '') {
            projDate.textContent = `Due: ${proj.getDueDate()}`
        }
        _clearProjectTodos()
        _printTodos(proj.getTodoArray())
        // proj.getTodoArray().forEach(todo => {
        //     printTodo(todo)
        // });
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


        const projBodySpans = document.querySelectorAll('.project-body-responsive-left')
        const projDueSpans = document.querySelectorAll('.project-body-responsive-right')

        const width = window.innerWidth;

        let resizeForSmall = false;

        if(width < 700) {
            resizeForSmall = true;
        } else {
            resizeForSmall = false;
        }

        for(let i=0; i<projBodySpans.length; i++) {
            if(resizeForSmall) {
                projBodySpans[i].classList.remove('s8')
                projBodySpans[i].classList.add('s12')
                projBodySpans[i].classList.add('small-mar-bot')

                projDueSpans[i].classList.remove('s4')
                projDueSpans[i].classList.add('s12')

            } else {
                projBodySpans[i].classList.remove('s12')
                projBodySpans[i].classList.add('s8')
                projBodySpans[i].classList.remove('small-mar-bot')

                projDueSpans[i].classList.add('s4')
                projDueSpans[i].classList.remove('s12')
            }
        }


        for(let i=0; i<rmvProjBtns.length;i++) {

            if(resizeForSmall) {
                rmvProjBtns[i].classList.remove('s3')
                rmvProjBtns[i].classList.remove('offset-s2')
    
                rmvProjBtns[i].classList.add('s5')
    
                openProjBtns[i].classList.remove('s3')
                openProjBtns[i].classList.add('s5')
            } else {
                rmvProjBtns[i].classList.add('s3')
                rmvProjBtns[i].classList.add('offset-s2')
    
                rmvProjBtns[i].classList.remove('s5')
    
                openProjBtns[i].classList.add('s3')
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
        projBodySpan.className = 'col s8 project-body-responsive-left'
        projBodySpan.textContent = `${proj.getDescr()}`
        projDueSpan.className = 'col s4 row project-body-responsive-right'

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
        if(todo.getUrgent() == true) {
            formUrgent.checked = true;
        } else {
            formUrgent.checked = false;
        }


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

    const _newTodoModal = (todo) => {
        const todoModal = document.createElement('div')
        todoModal.className = 'todo-modal blue-grey darken-3 modal'
        todoModal.id = `todo-modal-${todo.getId()}`

        const todoModalContent = document.createElement('div')
        todoModalContent.className = 'modal-content no-pad-bot'

        const todoModalTitleSpan = document.createElement('span')

        const todoModalTitle = document.createElement('h5')
        todoModalTitle.className = 'center white-text'
        todoModalTitle.id = `todo-modal-title-${todo.getId()}`

        todoModalTitleSpan.appendChild(todoModalTitle)

        const todoModalDateDiv = document.createElement('div')
        todoModalDateDiv.className = 'row container no-pad-bot white-text'

        const todoModalCreatedOn = document.createElement('p')
        todoModalCreatedOn.id = `todo-created-on-date-${todo.getId()}`
        todoModalCreatedOn.className = 'left'
        // todoModalCreatedOn.id = todo.getId()

        const todoModalDueDate = document.createElement('p')
        todoModalDueDate.id = `todo-due-date-${todo.getId()}`
        todoModalDueDate.className = 'right'
        // todoModalDueDate.id = todo.getId()

        todoModalDateDiv.appendChild(todoModalCreatedOn)
        todoModalDateDiv.appendChild(todoModalDueDate)

        const todoModalDescr = document.createElement('div')
        todoModalDescr.id = `todo-modal-descr-${todo.getId()}`
        todoModalDescr.className = 'center white-text'
        
        todoModalContent.appendChild(todoModalTitleSpan)
        todoModalContent.appendChild(todoModalDescr)
        todoModalContent.appendChild(todoModalDateDiv)

        todoModal.appendChild(todoModalContent)
        
        const todoModalFooter = document.createElement('div')
        todoModalFooter.className = 'modal-footer blue-grey darken-2 '

        const todoFooter = document.createElement('div')
        todoFooter.className = 'row no-pad-bot container'
            
        const removeButton = document.createElement('a')
        removeButton.textContent = 'Remove'
        removeButton.id = todo.getId()
        removeButton.className = `red left btn waves-effect waves-light mar-left remove-button modal-btn-${todo.getId()}` 

        const editButton = document.createElement('a')
        editButton.id = todo.getId()
        editButton.textContent = 'Edit'
        editButton.className = `right btn waves-effect waves-light mar-right edit-button modal-btn-${todo.getId()}`
        todoFooter.appendChild(editButton)
 
        todoFooter.appendChild(removeButton)

        todoModalFooter.appendChild(todoFooter)

        todoModal.appendChild(todoModalFooter)

        const openProj = document.querySelector('#open-project')
        openProj.appendChild(todoModal)
    }

    const _newTodoContainer = (todo) => {



        const todoCont = document.createElement('li')
        todoCont.className = 'blue-grey darken-2 todo-container collection-item white-text'
        todoCont.id = `todo-container-${todo.getId()}`


        // const todoTop = document.createElement('div')
        // todoTop.className = 'text-in-mid'
        // todoTop.id = 'todo-top'

        const rowCont = document.createElement('div')
        rowCont.className = 'row no-pad-bot'

        const todoTitleDiv = document.createElement('div')
        todoTitleDiv.className = 'col s8'

        const todoTitle = document.createElement('span')
        todoTitle.className = 'bold left small-pad-right' 
        todoTitle.id = `todo-title-${todo.getId()}`

        const br = document.createElement('br')

        const todoDescr = document.createElement('span')
        todoDescr.className = 'left'
        todoDescr.style.fontStyle= 'italic';
        todoDescr.style.textAlign = 'left'
        todoDescr.id = `todo-descr-${todo.getId()}`

        const todoRightCont = document.createElement('div')
        todoRightCont.className = 'right col s4'

        const seeMoreTodoBtn = document.createElement('a')
        seeMoreTodoBtn.className = 'btn white-text waves-effect waves-light right open-todo-btn'
        seeMoreTodoBtn.id = todo.getId()
        seeMoreTodoBtn.textContent = 'Details'

        const todoCheckboxPara = document.createElement('p')
        todoCheckboxPara.className = 'right small-mar-top no-mar-bot white-text pad-left'
        const todoCheckboxLabel = document.createElement('label')
        todoCheckboxLabel.className = 'white-check'
        
        todoCheckboxPara.appendChild(todoCheckboxLabel)
        
        const todoCheckbox = document.createElement('input')
        todoCheckbox.type = 'checkbox'
        todoCheckbox.className = 'filled-in'
        todoCheckbox.id = `checkbox-${todo.getId()}`
        todoCheckboxLabel.appendChild(todoCheckbox)
        const todoCheckboxSpan = document.createElement('span')
        todoCheckboxSpan.className = 'no-pad todo-checkbox white-check'
        todoCheckboxSpan.id = todo.getId()

        todoCheckboxLabel.appendChild(todoCheckboxSpan)

        const urgentIndicator = document.createElement('i')
        urgentIndicator.className = 'material-icons left red-text six-pad-top text-darken-2'
        urgentIndicator.textContent = 'new_releases'



        todoTitleDiv.appendChild(todoTitle)
        if(todo.getUrgent() == true) {
            todoTitleDiv.appendChild(urgentIndicator)
        }
        todoTitleDiv.appendChild(br)
        todoTitleDiv.appendChild(todoDescr)

        rowCont.appendChild(todoTitleDiv)

        todoRightCont.appendChild(todoCheckboxPara)
        todoRightCont.appendChild(seeMoreTodoBtn)
        rowCont.appendChild(todoRightCont)

        todoCont.appendChild(rowCont)
        projTodos.appendChild(todoCont)

    }

    const _printTodos = (todoArray) => {
        let urgentList = []
        for(let i=0; i<todoArray.length; i++) {
            if(todoArray[i].getUrgent() == true) {
                printTodo(todoArray[i])
                urgentList.push(i)
            }
        }
        for(let i=0; i<todoArray.length; i++) {
            if(!urgentList.includes(i)) {
                printTodo(todoArray[i])
            }
        }
    }

    // Print todo to the DOM
    const printTodo = (todo) => {

        _newTodoContainer(todo)
        _newTodoModal(todo)
        // const todoCont = document.querySelector(`#todo-container-${todo.getId()}`)
        const todoTitle = document.querySelector(`#todo-title-${todo.getId()}`)
        const todoCheckbox = document.querySelector(`#checkbox-${todo.getId()}`)

        const todoModalTitle = document.querySelector(`#todo-modal-title-${todo.getId()}`)
        const todoDescr = document.querySelector(`#todo-descr-${todo.getId()}`)
        const todoModalDescr = document.querySelector(`#todo-modal-descr-${todo.getId()}`)
        const todoModalDueDate = document.querySelector(`#todo-due-date-${todo.getId()}`)
        const todoModalCreatedOn = document.querySelector(`#todo-created-on-date-${todo.getId()}`)
 
        todoTitle.textContent = `${todo.getTitle()} `;
        todoModalTitle.textContent = todo.getTitle();
        // if(todo.getDescr() != '' && todo.getDescr() != ' ') {
            todoDescr.textContent = `${todo.getDescr()}`;
        // }
        todoModalDescr.textContent = todo.getDescr()

        todoModalCreatedOn.textContent = `Created: \n ${HelpfulFunctions.formatDate(todo.getCreatedDate())}`

        if(todo.getDueDate() != '' && todo.getDueDate() != ' ') {
            todoModalDueDate.textContent = `Due: \n ${HelpfulFunctions.formatDate(todo.getDueDate())}`;
        } else { 
            todoModalDueDate.textContent = 'Due: \n 00/00/0000'
        }

        todoCheckbox.checked = (todo.getComplete() == true) ? true: false;

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


    const initModal = (domElem) => {
        // const todoModal = document.querySelector(`#todo-modal-${id}`)
        if(!M.Modal.getInstance(domElem)) {
            let mInstance = M.Modal.init(domElem);
        }
    }

    return  {
        initModal: initModal,
    }
    
})();