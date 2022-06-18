import React, {useEffect, useState} from 'react'
import style from "./Covid.module.css"
import { CovidChart } from './CovidChart'
import { useNavigate } from 'react-router'

const Covid = () => {
    const [active, setActive] = useState(0)
    const [recovered, setRecovered] = useState(0)
    const [deaths, setDeaths] = useState(0)
    const [countryData, setCountryData] = useState([])
    const [country, setCountry] = useState("");
    const [from, setFrom] = useState("2022-06-22")
    const [to, setTo] = useState("2022-06-16");
    const [user,setUser] = useState("")
    const [sData,setSdata] = useState([])

    const navigate = useNavigate()

    const getCovidData =  () => {
        fetch("https://api.covid19api.com/summary")
        // fetch(`https://api.covid19api.com/country/${country}`)

        .then((res) =>{
            return res.json()
        })
        .then((data) =>{
            setActive(data.Global.TotalConfirmed);
            setRecovered(data.Global.TotalRecovered);
            setDeaths(data.Global.TotalDeaths);
            setCountryData(data.Countries);
            // setCountryData([...data])
        })
        .catch((err) =>{
           console.log(err);
        })
    }

    useEffect(() => {
       getCovidData();
       checkUser()
       
    }, [])
  
    function checkUser(){
        let userDetail = JSON.parse(localStorage.getItem("token")) 
        
        !userDetail?navigate("/login"):navigate("/")
    }

    const getCountryData =  () => {
        fetch(`https://api.covid19api.com/country/${user}`)
        .then((res) =>{
            return res.json()
        })
        .then((data) =>{
            setSdata([...data])
        })
        .catch((err) =>{
           console.log(err);
        })
    }

    // useEffect(() => {
    //     getCountryData();
    // }, [])

    const handleFromDate =(e)=>{
      setFrom(e.currentTarget.value);
    }

    const handleToDate =(e)=>{
      setTo(e.currentTarget.value);
    }

    const handleCountrySelection =(e)=>{
     setUser(e.currentTarget.value);
    }
    useEffect(() => {
     
        getCountryData()
    }, [user])
    
    
    
  return (
    <div className={style.body}>
        <div className={style.filterBox}>
           <h3>Filter </h3>
           <div className={style.filterDetails}>
                <select className={style.select} value={user} onChange={handleCountrySelection}>
                    <option >Countries</option>
                    {
                      countryData.length!==0? countryData.map(item=>
                       <option value={item.Slug} key={item.CountryCode}>{item.Country}</option>
                        ):""
                    }
                </select>
            </div>

            <div className={style.chooseRange}>
                <h4>From</h4>
                <input type="date" className={style.inputDate} onChange={handleFromDate} />

                <h4>To</h4>
                <input type="date" className={style.inputDate} onChange={handleToDate}/>
            </div>

        </div>

        <div className={style.filteration}>
            <div className={style.totalBox}>
                <h3>Total Active Cases</h3>
                <span><b>{active}</b></span>
            </div>

            <div className={style.totalBox} >
                <h3 style ={{color:"rgb(7, 97, 47)"}}>Total Recovered </h3>
                <span><b>{recovered}</b></span>
            </div>

            <div className={style.totalBox}>
                <h3>Total Deceased</h3>
                <span><b>{deaths}</b></span>
            </div>

        </div>

        {
            country!==""?<div className={style.table}>
            <table >
                <thead>
                    <tr style={{color:"rgb(199, 31, 104)"}}>
                        <th>Country Name</th>
                        <th>Total Confirmed Cases</th>
                        <th>Total Recovered Cases</th>
                        <th>Total Deceased</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>{country}</td>
                        <td>{active}</td>
                        <td>{recovered}</td>
                        <td>{deaths}</td>
                    </tr>
                </tbody>

            </table>

         </div>
        
          :<div></div>
        }
        <CovidChart start={from} end = {to} datas= {sData?sData:[]} />
    </div>
 )
}
export default Covid;
