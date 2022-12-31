$(document).ready( function (){


    var userInput = "";
    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?"
    var key = "&appid=e59cd40bbcdff38f1a572b109e5022e6"
    var unit ="&units=metric"


    $('#search-button').on("click", function (event) {

      event.preventDefault()

        userInput = $('#search-input').val()
        queryUrl = apiUrl+ "q=" + userInput + key + unit

        console.log(queryUrl)

        $.ajax({
            url: queryUrl,
            method: 'GET'
             }). then(function(response){
    
                console.log(response)

                let city = $("<h2>")
                city.text(response.city.name +" " + "( " +response.list[0].dt_txt + " )")

                let temp = $("<p>")
                temp.text("Temp: " + response.list[0].main.temp + "C" )
                let wind = $("<p>")
                wind.text("Wind: " + response.list[0].wind.speed )
                let humidity = $("<p>")
                humidity.text("Humidity: " + response.list[0].main.humidity + "%" ) 

                $("#today").append(city, temp, wind, humidity)
            }
            
            )


                // for forcast 

    $.ajax({
        url: queryUrl,
        method: 'GET'
         }). then(function(response){

            console.log(response)

            for (let i=0; i<5; i++){

             let city = $("<p>")
            city.text( "(" +response.list[((i+1)*8)-1].dt_txt + ")")

            

            

            let temp = $("<p>")
            temp.text("Temp: " + response.list[((i+1)*8)-1].main.temp + "C" )
            let wind = $("<p>")
            wind.text("Wind: " + response.list[((i+1)*8)-1].wind.speed )
            let humidity = $("<p>")
            humidity.text("Humidity: " + response.list[((i+1)*8)-1].main.humidity + "%" ) 

            let forcast = $('<div>')

            forcast.append(city, temp, wind, humidity)

            $('#forecast').append(forcast)


            }

          

            
        }
        
        )
    })
   




}


 


    
)