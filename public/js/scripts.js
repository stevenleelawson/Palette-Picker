
let randomColor = Math.floor(Math.random()*16777215).toString(16);
let colorArray = [];

const newColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

const elements = ['.one','.two', '.three', '.four', '.five']

let palettes = [];
let projects = [];
console.log('palettesarr', palettes)
const populateProjectNames = (projectNames) => {
  $.each(projectNames, (index, project) => {
    $('.select-options').append(`<option value=${project.id}>${project.title}</option>`)
    getPaletteColors(project.id)
  })
  $.each(projectNames, (index, project) => {
    $('.display-projects').append($(`<h3>${project.title}</h3>`))
  })
}

const populateProjectPalettes = (projectPalettes) => {
  $.each(projectPalettes, (index, palette) => {
    console.log('populate', palette)
    // $('.display-projects').append($(`<div class='palette-array'></div>`).css('background-color', ))
  })
}

const getProjectNames = async () => {
  try {
    const response = await fetch('/api/v1/projects', { mode: 'no-cors' });
    const projectNames = await response.json();
    console.log('prooject',projectNames)
    populateProjectNames(projectNames)
  } catch(error) {
    throw new Error('unable to get projects' + error)
  }
}

const getPaletteColors = async (projectId) => {
  const project_id = $('.select-options').val();
  try {
    const response = await
     fetch(`/api/v1/projects/${projectId}/palettes`);
    const projectPalettes = await response.json();
    console.log('paletecolor',projectPalettes)
    populateProjectPalettes(projectPalettes)
  } catch(error) {
    throw new Error('unable to get palettes' + error)
  }
}
// getProjectNames();

const postProject = async (projects) => {
  try {
    const response = await fetch('/api/v1/projects', {
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



const postPalette = async (palettesObj, projectId) => {
  try {
    const response = await fetch(`/api/v1/projects/${projectId}/palettes`, {
      method: 'POST',
      body: JSON.stringify(palettesObj),
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
  $('.new-project').val('');
}

const addPalette = (event) => {
  const id = $('.select-options').val();
  const paletteName = $('.new-palette').val();
  const paletteObj = paletteObjMaker(paletteName)
  console.log(paletteObj)
  postPalette(paletteObj, id);
}

const paletteObjMaker = (name) => {
  return { name: name, color_array: palettes }
}

const captureColor = () => {
  elements.forEach( element => {
    palettes.push($(element).css('background-color'))
  })
}

captureColor()
console.log(palettes[0])
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

$('.select-options').on('click', () => console.log($('.select-options').val()))
$('.project-btn').on('click', addProject)
$('.palette-btn').on('click', addPalette)
$('.save').on('click', lockColor)
$('.generate-btn').on('click', changeColor);
$( document ).ready(function() {
    getProjectNames()

});
