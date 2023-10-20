const canvas = document.getElementById("canvas");
const hex_input = document.getElementById("hex-input");

document.getElementById("btn-copy").onclick = async () => {
    try {
        await navigator.clipboard.writeText(hex_input.value);
    } catch (e) {
        console.error(`HextoColorError: ${e}`);
    }
};

chrome.runtime.sendMessage({ request: "popupcolor" })
    .then((response) => {
        console.log(response);
        if (response) {
            canvas.style.backgroundColor = `#${response.color}`;
            hex_input.value = response.color;
        }
    })
    .catch((e) => {
        console.error(`HextoColorError: ${e}`);
    });

chrome.runtime.onMessage.addListener(( message,
    _sender, _sendResponse) => {
        let color;
        if (message.request === "iconchange")
        color = message.icon_color;
        else
        return;
        canvas.style.backgroundColor = `#${color}`;
        hex_input.value = color;
    });
