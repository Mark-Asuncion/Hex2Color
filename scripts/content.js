addEventListener("mouseup", (_) => {
    let selection = document.getSelection();
    let message = {};

    if (selection.type === "Caret") {
        console.log("empty");
        return;
    }
    let text = selection.getRangeAt(0);
    console.log(`${text} type: ${selection.type}`);

    message.change_color = true;
    message.icon_color = text.toString();
    chrome.runtime.sendMessage(message)
        .catch((e) => {
            console.log(e);
        });
});

/*
*   You can call Document.getSelection(), which works identically to Window.getSelection().
*
*   It is worth noting that currently getSelection() doesn't work on the content of <textarea> and <input> elements in Firefox and Edge (Legacy). HTMLInputElement.setSelectionRange() or the selectionStart and selectionEnd properties could be used to work around this.
*
*   Notice also the difference between selection and focus. Document.activeElement returns the focused element.
*/
