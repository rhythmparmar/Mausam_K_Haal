import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {

  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})

  const getWeatherDetails = (cityName) => {
    if(!cityName) return
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e30ae59924c811c3a7c32c32db02fc8f`

    
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data)
        setData(res.data)
      })
      .catch((err) => {
        console.log("err", err)
      })
  }

  const handleChangeInput = (e) => {
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWeatherDetails(inputCity)
  }


  useEffect(() => {
    getWeatherDetails()
  }, [])


  return (
    <>

    <div className="col-md-12">

      <div className="weatherBg">
        <h1 className="heading">Mausam k Haal</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text"  className="form-control" placeholder="Search for your weather..." value={inputCity} onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>Search</button>
        </div>
      </div>
      
      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded weatherResultBox">
          <img className="weatherIcon" alt="not found" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEGeTqAfUu-Ip2zpJRiiT1QgXA6WAm1TDQm3EFF7Ecx9Pq47l8565hZnYiP0ozD83Ov4&usqp=CAU"></img>
          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp">{((data?.main?.temp)-273.15).toFixed(2)}°C</h6>
        </div>
      </div>

    </div>
    
    </>
  )
}
export default App;