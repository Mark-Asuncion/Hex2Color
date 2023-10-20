const img_size = 16;
const canvas = new OffscreenCanvas(img_size, img_size);
const context = canvas.getContext("2d", { willReadFrequently: true });
var prev_color = "";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.request === "iconchange") {
        change_icon_color(message.icon_color);
    }
    else if (message.request === "popupcolor") {
        sendResponse({ color: ( prev_color )? prev_color:"" });
    }
});

/**
 * @param {string} color
 * @return {bool}
 */
function change_icon_color(color) {
    if (!color) { return false; }
    prev_color = color;

    context.clearRect(0, 0, img_size, img_size);
    context.fillStyle = `#${color}`;
    context.fillRect(0, 0, img_size, img_size);
    const imageData = context.getImageData(0, 0, img_size, img_size);
    chrome.action.setIcon({ imageData: imageData }, () => {
    });
    return true;
}
