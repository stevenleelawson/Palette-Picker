let randomColor = Math.floor(Math.random()*16777215).toString(16);
let colorArray = [];

const newColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

const elements = ['.one','.two', '.three', '.four', '.five']

const changeColor = () => {

  elements.forEach( element => {
    if (!$(element).hasClass('locked')) {
      $(element).css('background-color', `#${newColor()}`)
    }
  })
}

const lockColor = () => {
  console.log(event.target.parentNode)
  $(event.target.parentNode).toggleClass('locked')
}

$('.save').on('click', lockColor)
$('.generate-btn').on('click', changeColor);
