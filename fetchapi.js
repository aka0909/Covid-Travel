var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (name) => {
    await fetch(
      "https://api.covid19api.com/total/country/" + name + "/status/confirmed",
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
      "https://api.covid19api.com/total/country/" + name + "/status/recovered",
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
      "https://api.covid19api.com/total/country/" + name + "/status/deaths",
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

      updateUI();

    }

    function updateUI(name, recovered_list, deaths_list,cases_list, dates_list ){
        const total_cases = cases_list[cases_list.length - 1];
        const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];
      
        const total_recovered = recovered_list[recovered_list.length - 1];
        const new_recovered_cases = total_recovered - recovered_list[recovered_list.length - 2];
      
        const total_deaths = deaths_list[deaths_list.length - 1];
        const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];
      
        countryName.innerHTML = name;
        total_cases_element.innerHTML = total_cases;
        new_cases_element.innerHTML = `+${new_confirmed_cases}`;
        recovered_element.innerHTML = total_recovered;
        new_recovered_element.innerHTML = `+${new_recovered_cases}`;
        deaths_element.innerHTML = total_deaths;
        new_deaths_element.innerHTML = `+${new_deaths_cases}`;
    
     }