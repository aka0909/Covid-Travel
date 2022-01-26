const countryName = document.querySelector('.nation-info .name');
const flag = document.querySelector('.nation-info .flag');
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const ctx1 = document.getElementById("chart1").getContext("2d");
const ctx2 = document.getElementById("chart2").getContext("2d");


let cases_list = [];
let recovered_list = [];
let deaths_list = [];
let dates_list = [];
let formatedDates = [];

let base_url="https://api.covid19api.com/total/country/";

var requestOptions = {
    method: "GET",
    redirect: "follow",
 };



//Get user's country name and code
 fetch("https://api.ipgeolocation.io/ipgeo?apiKey=899a7f5600e74b70a9b26d0ee79d3954")
 .then(res=>res.json())
 .then(data =>{
     countryName.innerHTML = `${data.country_name}`;
     let flag=false;
     let user_country_name;
     country_list.forEach(ele=>{
         if(ele.code === data.country_code2){
             flag=true;
             user_country_name=ele.name;
         }
     });
     if(!flag){
         alert('Sorry. Could not find any info')
     }else{
         fetchData(user_country_name);
     }
 });

 //Fetch All Data By Country Code
 function fetchData(name) {
    countryName.innerHTML = "Loading...";
    flag.innerHTML ="";
    cases_list.length = 0;
    recovered_list.length = 0;
    deaths_list.length = 0;
    dates_list.length = 0;
    formatedDates.length = 0;
    api_fetch(name);
  }


  const api_fetch = async (name) => {
    await fetch(
      base_url + name + "/status/confirmed",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          dates_list.push(entry.Date);
          cases_list.push(entry.Cases);
        });
      });

    await fetch(
        base_url + name + "/status/recovered",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          recovered_list.push(entry.Cases);
        });
      });

    await fetch(
        base_url + name + "/status/deaths",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data.forEach((entry) => {
          deaths_list.push(entry.Cases);
        });
      });

    updateDOM(name);
  };

  
 function updateDOM(name){
    updateStats(name);
    updateChart();

 }

 function updateStats(name){
    const total_cases = cases_list[cases_list.length - 1];
    const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];
  
    const total_recovered = recovered_list[recovered_list.length - 1];
    const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];
  
    const total_deaths = deaths_list[deaths_list.length - 1];
    const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];
  
    countryName.innerHTML = name.toUpperCase();
    total_cases_element.innerHTML = total_cases;
    new_cases_element.innerHTML = `+${new_confirmed_cases}`;
    recovered_element.innerHTML = total_recovered;
    new_recovered_element.innerHTML = `+${new_recovered_cases}`;
    deaths_element.innerHTML = total_deaths;
    new_deaths_element.innerHTML = `+${new_deaths_cases}`;
 }

 let my_chart1;
 let my_chart2;

 function updateChart(){
    if (my_chart1) {
        my_chart1.destroy();
      }
    
      my_chart1 = new Chart(ctx1, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Total Cases",
              data: cases_list,
              fill: false,
              borderColor: "black",
              backgroundColor: "black",
              borderWidth: 0.2,
              pointRadius: 1,
            },
            {
              label: "Recovered",
              data: recovered_list,
              fill: false,
              borderColor: "#009688",
              backgroundColor: "#009688",
              borderWidth: 0.2,
              pointRadius: 1,
            },
            {
              label: "Deaths",
              data: deaths_list,
              fill: false,
              borderColor: "#f44336",
              backgroundColor: "#f44336",
              borderWidth: 0.2,
              pointRadius: 1,
            },
          ],
          labels: dates_list,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    
      let Xarr = ["Total Cases", "Recovered",  "Deaths"];
      let Yarr = [cases_list[cases_list.length - 1], recovered_list[recovered_list.length - 1], deaths_list[deaths_list.length - 1]]
      let colors = ["black","#009688", "#f44336"]

      if(my_chart2){
          my_chart2.destroy();
      }

      my_chart2 = new Chart(ctx2, {
        type: "doughnut",
        data: {
            labels: Xarr,
            datasets: [{
              backgroundColor: colors,
              data: Yarr
            }]
        },
        options: {
         responsive: true,
         maintainAspectRatio: false,
        }

      });



 }




