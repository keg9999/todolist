const weather = document.querySelector(".js-weather");

const API_KEY = "5cd32311de18bfde2e096e8c4eb39e44";
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(  //fetch(``): 데이터 얻기, 따옴표가 아니라 백틱을 사용해야 함. 
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        ).then(function(response){      //then(함수): 기본적으로 함수를 호출하는 것, 그러나 데이터가 완전히 들어온 다음 호출한다. 
            return response.json();     //json 데이터를 가져옴 (이유: response에는 네트워크 정보만 보임)
        }).then(function(json){
            const temperture = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperture} @ ${place}`;
        });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    console.log(coordsObj);
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,   //latitude: latitude => 이처럼 객체의 키와 벨류의 이름이 같을경우 latitude만 써도 된다. 
        longitude  //longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log('cant access');
}

function askForCoords(){    //좌표를 요청하는 함수
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
    //navigator.geolocation.getCurrentPosition(요청성공시 실행할 콜백함수, 실패시 실행할 콜백함수)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {    //이미 좌표값을 가지고 있는 경우
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();