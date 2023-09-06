const canvas = new OffscreenCanvas(16, 16);
const context = canvas.getContext('2d');

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    // console.log(`Received Message: ${message["icon-color"]}`);
    change_icon_color(message.icon_color);
});

function change_icon_color(color /* string */) {
    console.log(color);
    context.clearRect(0, 0, 16, 16);
    context.fillStyle = '#00FF00';  // Green
    context.fillRect(0, 0, 16, 16);
    const imageData = context.getImageData(0, 0, 16, 16);
    chrome.action.setIcon({ imageData: imageData }, () => {
    });
}
