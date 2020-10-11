

// Manages All projects 
const ProjectManager = (function() {

    let projects = []

    function loadProjectsFromStorage() {
        let data = FileManager.loadAllProjects()
        projects = _convertDataToProjects(data)
        if(projects.length == 0) {
            projects.push(_makeDefaultProject())
        }
    }

    function _makeDefaultProject() {
        defaultProj = Project('Default Project', 'A default project', '')
        defaultTodo = Todo('Default todo', 'a default todo', '', 3, false)
        defaultProj.addTodo(defaultTodo)
        projects.push(defaultProj)
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
            let proj = Project(projectTitle, projectDescr, projectDueDate, projectId)
            let todoDataArray = todoData.split('/')
            for(let i=0; i<todoAmt; i++) {
                let dataArray = todoDataArray[i].split('|')
                let todoTitle = dataArray[1]
                let todoId = dataArray[0]
                let todoDescr = dataArray[2]
                let todoDueDate = dataArray[3]
                let todoUrgent = dataArray[4]
                let todoComplete = dataArray[5]
                let todo = Todo(todoTitle, todoDescr, todoDueDate, todoUrgent, todoComplete, todoId)
                todoArray.push(todo)
            }
            proj.setTodoArray(todoArray)
            projectArray.push(proj)
        })
        return projectArray
    }

    return {
        loadProjectsFromStorage: loadProjectsFromStorage,
    }
    


})();

const TodoManager = (function() {
    
    
        return {

        }

})();



const AppContoller = (function() {

    window.addEventListener('DOMContentLoaded', function() {
        ProjectManager.loadProjectsFromStorage()
    });


})();