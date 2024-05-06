"use strict"

document.getElementById("search-button").addEventListener("click", consultarAPI);

function consultarAPI(){
    let xhr, url, city, apiKey;

    city = document.getElementById("place-input").value;
    apiKey = "7c5f20c2bf8231c37e559843a2cd4409";
  


    url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";

    xhr = new XMLHttpRequest();
    xhr.onload = function(){
        mostrarInformacion(this);
    }
    xhr.open("GET", url)
    xhr.send()
}

function mostrarInformacion(xhr){
    let obj, temp, city, country, weatherDescription, icon, codigoHTML;
    if (xhr.responseText === '{"cod":"404","message":"city not found"}'){
        document.getElementById("mgs").innerHTML = "Ciudad no encontrada"
    }
    else{
        console.log(xhr.responseText);
        obj = JSON.parse(xhr.responseText)
        city = obj.name;
        temp = obj.main.temp;
        country = obj.sys.country;
        weatherDescription = obj.weather[0].description;
        icon = obj.weather[0].icon;

        codigoHTML = '<div class="tarjeta">' +
                        '<h2 class="city-name">' + city + '<sup id="region">' + country + '</sup></h2>' +
                        '<p class="' + temp + '">20<sup>ºC</sup></p>' +
                        '<figure>' +
                            '<img src="http://openweathermap.org/img/wn/'+ icon +'@2x.png" alt="">' +
                            '<figcaption>' + weatherDescription + '</figcaption>' +
                        '</figure>' +
                    '</div>';

        document.getElementById("mgs").innerHTML = ""
        
        document.getElementById("resultado").innerHTML += codigoHTML
    }
}