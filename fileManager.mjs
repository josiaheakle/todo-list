
const FileManager = (function() {

    function deleteProjectFromStorage(project) {
        if(!localStorage.getItem(`project-${project.getId()}`)) {
            return false;
        } else {
            localStorage.removeItem(`project-${project.getId()}`)
            return true;
        }
    }

    function saveProject(project) {
        if(project != undefined)
            localStorage.setItem(`project-${project.getId()}`, project.makeDataString())
    }

    function _clearProjectsFromStorage() {
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i)
            let data = localStorage.getItem(key)
            if(!(key == 'project-counter' || key=='todo-counter')) {
                localStorage.removeItem(key)
            }
        }
    }

    function saveProjectArray(projectArray) {

        _clearProjectsFromStorage();
    
        projectArray.forEach(project => {
            saveProject(project)
        })

    }

    function loadAllProjects() {

        let dataArray = []
        for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i)
            let data = localStorage.getItem(key)
            if(!(key == 'project-counter' || key=='todo-counter')) {
                // console.log(key)
                dataArray.push(data)
            }
        }
        return(dataArray)
    }

    return {
        deleteProjectFromStorage: deleteProjectFromStorage,

        saveProject: saveProject,
        saveProjectArray: saveProjectArray,
        loadAllProjects: loadAllProjects,
    }


})();