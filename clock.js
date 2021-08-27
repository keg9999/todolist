const clockContainer = document.querySelector(".js-clock"),
    clockTitle = document.querySelector("h1");

function getTime(){
    const date = new Date();
    const minuets = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minuets < 10 ? `0${minuets}` : minuets}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();