const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const hex_input = document.getElementById("hex-input");

/**
* @param {string} color
* @param {string} text
*/
function change_color(color) {
    color = (color[0] === '#')? color:`#${color}`;
    context.clearRect(0, 0, 100, 100);
    context.fillStyle = color;
    context.fill();
    hex_input.value = color.substring(1);
}

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    change_color(message.icon_color)
    console.log(message)
});
