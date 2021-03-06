let todoCounter =0;
if(localStorage.getItem('todo-counter')) {
    todoCounter = localStorage.getItem('todo-counter')
} 

const Todo = (titleIn, descrIn = ' ', dueDateIn = ' ', urgentLvl, completeIn = false, idIn = todoCounter++, cDate = HelpfulFunctions.getCurrentDate()) => {

    localStorage.setItem('todo-counter', todoCounter)

    const id = idIn
    const title = titleIn;
    const descr = descrIn;
    const dueDate = dueDateIn;
    const createdDate = cDate;
    let urgent;
    if(urgentLvl == undefined) {
        urgent = false;
    } else {
        urgent = urgentLvl;

    }
    let complete = completeIn;

    const getId = () => {
        return id;
    }
    
    const getTitle = () => {
        return title;
    }

    const getDescr = () => {
        return descr;
    }

    const getDueDate = () => {
        return dueDate;
    }

    const getCreatedDate = () => {
        return createdDate;
    }

    const getUrgent = () => {
        return urgent;
    }

    const getComplete = () => {
        return complete;
    }

    const setComplete = (bool) => {
        complete = bool;
    }


    return {
        getId,
        getTitle,
        getDescr,
        getDueDate,
        getCreatedDate,
        getUrgent,
        getComplete,
        setComplete,
    }


} 

let projCounter = 0;
if(localStorage.getItem('project-counter')) {
    projCounter = localStorage.getItem('project-counter')
} 
const Project = (titleIn, descrIn = ' ', dueDateIn = ' ', idIn = projCounter++) => {

    localStorage.setItem('project-counter', projCounter)


    const id = idIn
    const title = titleIn;
    const descr = descrIn;
    const dueDate = dueDateIn;
    let todoArray = [];

    const getId = () => {
        return id;
    }
    
    const getTitle = () => {
        return title;
    }

    const getDescr = () => {
        return descr;
    }

    const getDueDate = () => {
        return dueDate;
    }

    const getTodoArray = () => {
        return todoArray;
    }

    const getTodoFromId = (todoId) => {
        for(let i=0; i<todoArray.length; i++) {
            if(todoArray[i].getId() == todoId) {
                return todoArray[i]
            }
        }
    }

    const addTodo = (todo) => {
        todoArray.push(todo)
    }

    const setTodoArray = (todoAr) => {
        todoArray = todoAr;
    }

    const removeTodo = (todoId) => {
        for(let i=0; i<todoArray.length; i++) {

            if(todoArray[i].getId() == todoId) {
                todoArray.splice(i, 1);
            }
        }
    }

    const makeDataString = () => {
        const dataString = `${id}|$$|${title}|$$|${descr}|$$|${dueDate}${_makeTodoArrayDataString()}`;
        return dataString;

    }

    const _makeTodoArrayDataString = () => {
        let todoStr =  `{${todoArray.length}}`;
        todoArray.forEach(todo => {
            todoStr = `${todoStr}${todo.getId()}|$$|${todo.getTitle()}|$$|${(todo.getDescr()=='')?' ':todo.getDescr()}|$$|${(todo.getDueDate()=='')?' ': todo.getDueDate()}|$$|${(todo.getUrgent()==true?true:false)}|$$|${todo.getComplete()}|$$|${todo.getCreatedDate()}/$$/`;
        })




        return todoStr;
    }

    return {
        getId,
        getTitle,
        getDescr,
        getDueDate,
        getTodoArray,
        getTodoFromId,

        addTodo,
        setTodoArray,
        removeTodo,


        makeDataString,
    }

}

