window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/0d1740620afb2b87c700d29811c69b6a/${lat},${long}`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    //Pull data from JSON and put into {} so that it is easier to access
                    const {temperature, summary, icon } = data.currently;
                    //Set DOM Elements from the API
                    temperatureDegree.textContent = Math.floor(temperature);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //Formula for converting farrenheight to celcius
                    let celcius = (temperature - 32) * (5 / 9);

                    //Set icon
                    setIcons(icon, document.querySelector('.icon'));

                    //Change temperature to celcius/farrenheight
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === "°F"){
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celcius);
                        } else {
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = Math.floor(temperature);
                        }
                    })
                });
        })
    }else{
        h1.textContent = "hey dis is not working bsc reasons"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});