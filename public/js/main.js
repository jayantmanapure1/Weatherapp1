const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const curday =document.getElementById('day');
const curDate  =document.getElementById('today_date');
const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    }else{

        try{
           

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=863242cfb2b1d357e6093d9a4df19a4b`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
            temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else if (tempMood == "Haze") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-haze' style='color: #a4b0be;'></i>";
                } else {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

            }

            datahide.classList.remove('data_hide');
            cityVal = "";
           
       
        }catch{
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText =  `please enter the proper city name`;
            console.log('please add the proper city name');
        }
        
    }
}
const getCurrentDay = ()=>{
    let currentTime = new Date();
    const weekday = new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tuesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
    
    return weekday[currentTime.getDay()];

}

const getCurrentTime = ()=>{
    let now = new Date();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
            
    var month = months[now.getMonth() ];

    var day = now.getDate();
    
    return day + " " + month;
    
}
curday.innerHTML = getCurrentDay();
 curDate.innerHTML =getCurrentTime();


submitBtn.addEventListener('click', getInfo);