const img_size = 16;
const canvas = new OffscreenCanvas(img_size, img_size);
const context = canvas.getContext("2d", { willReadFrequently: true });
const HEX = [
    '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'F'
]

chrome.runtime.onMessage.addListener((message, _sender, _sendResponse) => {
    // console.log(`Received Message: ${message["icon-color"]}`);
    if (message.change_color) {
        validate_hex(message.icon_color)
            .then(
                val => {
                    // TODO: expand str color if less than len of 6
                    console.log(val);
                    change_icon_color(expand(val));
                },
                e => { console.error(e); }
            )
    }
});

function expand(color /* string */) {
    if (!color) { return null; }
    let idx = 0;
    if (color[idx] === '#') { idx++; }
    let ret = ""
    let chex = Math.trunc( 6 / (color.length - idx) );
    for (idx; idx<color.length;idx++) {
        ret+=color[idx].repeat( (chex === 0)? 1:chex);
    }
    if (ret.length < 6) {
        ret+='0'.repeat(ret.length-6);
    }
    console.log(ret)
    return ret;
}

function validate_hex(color /* string */) {
    if (!color) { return Promise.reject("Empty"); }
    let maxLen = 6;
    let idx = 0;
    color = color.toUpperCase()
    if (color[idx] === '#') idx++;
    while (idx<maxLen && idx<color.length) {
        let ctr = 0;
        for (ctr;ctr < HEX.length;ctr++) {
            if (color[idx] === HEX[ctr]) {
                break;
            }
        }
        if (ctr === ( HEX.length )) {
            return Promise.reject("Invalid");
        }
        idx++;
    }
    return Promise.resolve(color);
}

function change_icon_color(color /* string */) {
    if (!color) { return undefined; }

    context.clearRect(0, 0, img_size, img_size);
    context.fillStyle = (color[0] === '#')? color:`#${color}`;
    context.fillRect(0, 0, img_size, img_size);
    const imageData = context.getImageData(0, 0, img_size, img_size);
    chrome.action.setIcon({ imageData: imageData }, () => {
    });
}
