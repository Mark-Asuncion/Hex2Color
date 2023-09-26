const img_size = 16;
const canvas = new OffscreenCanvas(img_size, img_size);
const context = canvas.getContext("2d", { willReadFrequently: true });

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    if (message.change_color) {
        change_icon_color(message.icon_color);
    }
});

/**
 * @param {string} color
 * @return {bool}
 */
function change_icon_color(color) {
    if (!color) { return false; }

    context.clearRect(0, 0, img_size, img_size);
    context.fillStyle = (color[0] === '#')? color:`#${color}`;
    context.fillRect(0, 0, img_size, img_size);
    const imageData = context.getImageData(0, 0, img_size, img_size);
    chrome.action.setIcon({ imageData: imageData }, () => {
    });
    return true;
}
