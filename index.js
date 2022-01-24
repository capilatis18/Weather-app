    const buscador = document.querySelector('#buscador');
    const btn = document.querySelector('#btn');
    const h1 = document.querySelector('h1');
    const pData = document.querySelectorAll('.data');
    const pMood = document.querySelector('#mood');
    const main = document.querySelector('#main');

    let newPlace;
    function capturar(){
        function PlaceLocator(placeToFind){
            this.placeToFind = placeToFind
        }
        newPlace = new PlaceLocator(buscador.value);
    }
    
    async function getWeather(place){
        const weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=e6ef26befc21c1d3dcef3b252dc3e7f2`, { mode: 'cors'
        });
        const weatherPlace = await weatherResponse.json();
        const weatherPlaceMain = weatherPlace.main;
        const moodWeather = weatherPlace.weather[0].main;
        const arrayMain = Object.values(weatherPlaceMain);
        
        async function weatherScreen(){
            // Name
            h1.textContent = weatherPlace.name;
            // Mood
            pMood.textContent = moodWeather;
            // Data
            let keyArray = [`Temperatura: ${arrayMain[0]}°c`, `Min: ${arrayMain[2]}°c`, `Max: ${arrayMain[3]}°c`, `Sensacion termica: ${arrayMain[1]}°c`, `Presion: ${arrayMain[4]}hPa`, `Humidity: ${arrayMain[5]}%`];
            for (let i = 0; i < keyArray.length; i++) {
                pData[i].textContent = keyArray[i];
            }
        }
        weatherScreen();
    }

    function addPop(){
        main.classList.add('main');
}
    
    btn.addEventListener('click', () =>{
    capturar();
    addPop();
    getWeather(newPlace.placeToFind);
    buscador.value = '';
    });