import React, {useEffect, useState} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export const  CovidChart = ({start,end,datas}) => {

console.log(start,end,datas,"dates")
useEffect(() => {
  let st = Number(start.split("-").join(""))
  let en =  Number(end.split("-").join(""))
  let arr = []
  for(let i = st ; i<en ;i++){
    let up = String(i).split("")
    console.log(up)

    if(Number(up[up.length-2]+up[up.length-1]) <32)
      arr.push(i)
    }
    setDates([...arr])
    console.log(dates,"dates")
}, [start,end])

const [dates, setDates] = useState([11, 12, 13, 14, 15, 16, 17])
const [cs, setCs] = useState([])
const [recovered,setRecovered]  = useState([])
const [dead,setDead]  = useState([])


useEffect(() => {
  let narr = []
  if(datas.length!=0){
 
      for(let i = 200 ; i<295;i++){
       narr.push(datas[i])
      }
      console.log(narr)

      let arr = narr.map((item)=>(Number(item.Date.split("T")[0].split("-").join())>=Number(dates[0]&&item.Date.split("T")[0].split("-").join())<=dates[dates.length-1]?item.Confirmed:""))
      let rarr = narr.map((item)=>(Number(item.Date.split("T")[0].split("-").join())>=Number(dates[0]&&item.Date.split("T")[0].split("-").join())<=dates[dates.length-1]?item.Recovered:""))
      let darr = narr.map((item)=>(Number(item.Date.split("T")[0].split("-").join())>=Number(dates[0]&&item.Date.split("T")[0].split("-").join())<=dates[dates.length-1]?item.Deaths:""))
      
      setCs(arr)
      setRecovered(rarr)
      setDead(darr)
      console.log(arr)
  }
  else return 
 
 }, [dates])

 const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

  const data = {
    labels : dates,
    datasets: [
      {
        label: 'Active',
        data:cs,
        backgroundColor: 'rgb(207, 7, 51)',
      },
      {
        label: 'Recovered',
        data:recovered,
        backgroundColor: 'rgb(11, 92, 38)',
      },
      {
        label: 'Deceased',
        data:dead,
        backgroundColor: 'rgb(11, 52, 79)',
      },
    ],
  };
  return <Bar options={options} data={data} />;
}
