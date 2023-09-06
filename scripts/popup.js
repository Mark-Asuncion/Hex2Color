document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    let width = canvas.clientWidth;
    let height = canvas.clientHeight;

    // ctx.beginPath();
    // ctx.arc(width/1.5, height/1.5, 70, 0, 2 * Math.PI);
    ctx.fillStyle = "#ff00ff";
    ctx.fill();
});
