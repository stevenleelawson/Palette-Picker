
let randomColor = Math.floor(Math.random()*16777215).toString(16);
let colorArray = [];

const newColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

const elements = ['.one','.two', '.three', '.four', '.five']

let palettes = [];
let projects = [];

const loopedProjects = projects.forEach(project => console.log(project));

const populateProjectNames = (projectNames) => {
  $.each(projectNames, (index, project) => {
    $('.select-options').append($(`<option>`, {
      value: project.id,
      text: project.title
    }))
  })
}

const getProjectNames = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/projects');
    const projectNames = await response.json();
    populateProjectNames(projectNames)
    console.log('innerprojects',projects)
  } catch(error) {
    throw new Error('unable to get projects' + error)
  }
}

getProjectNames();

const postProject = async (projects) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify(projects),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch(error) {
    throw new Error('unable to post project' + error)
  }
}

const objMaker = (string) => {
  return { title: string }
}

const addProject = (event) => {
  const project = $('.new-project').val();
  const projObj = objMaker(project)
  postProject(projObj)
}

const addPalette = (event) => {

}

const changeColor = () => {
  elements.forEach( element => {
    if (!$(element).hasClass('locked')) {
      $(element).css('background-color', `#${newColor()}`)
    }
  })
}

const lockColor = () => {
  $(event.target.parentNode).toggleClass('locked')
  $(event.target).toggleClass('locked-btn')
}


$('.project-btn').on('click', addProject)
$('.palette-btn').on('click', addPalette)
$('.save').on('click', lockColor)
$('.generate-btn').on('click', changeColor);
