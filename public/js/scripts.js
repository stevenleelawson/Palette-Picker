let randomColor = Math.floor(Math.random()*16777215).toString(16);
let colorArray = [];

const newColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

const elements = ['.one', '.two', '.three', '.four', '.five']

const changeColor = () => {
  elements.forEach( element => $(element).css('background-color', `#${newColor()}`))
}

$('.generate-btn').on('click', changeColor);
