const HEX = [
    '0', '1', '2', '3', '4',
    '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D','E','F'
];

addEventListener("mouseup", (_) => {
    let selection = document.getSelection();
    if (selection.type === "Caret"
        || selection.type === "None"
        || selection.type !== "Range"
    ) {
        return;
    }
    let text;
    try {
        text = selection.getRangeAt(0);
    }
    catch (e) {
        console.error(`HextoColorError: ${e}`);
        return;
    }
    validate_hex(text.toString())
        .then(
            val => {
                let message = {};
                message.request = "iconchange";
                message.icon_color = expand(val);
                chrome.runtime.sendMessage(message)
                    .catch((e) => {
                        console.error(`HextoColorError: ${e}`);
                    });
            },
        )
});

/**
 * @param {string} color
 * @return {string}
 */
function expand(color) {
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
    return ret;
}

/**
 * @param {string} color
 * @return {string}
 */
function validate_hex(color) {
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
