import React,{useState, useEffect} from "react";
import Header from '../components/Header';


export default function Meeting({}){
    const [data, setData] = React.useState([]);
    const [startDate, setStartDate] = React.useState([]);
    const [endDate, setEndDate] = React.useState([]);
    const [showState, setShowState] = React.useState('hidden');
useEffect(() => {
  fetch("/api")//meeting data
    .then((res) => res.json())
    .then((data) => setData(data))
}, []);

    console.log(data)
    return(
        <div>
            <Header />
            <h1>All the meetings</h1>
            <div className="timeChoiceDiv">
                {data.map((element, index) => (
                <div className="timeChoices" key={index} onClick={()=>{
                    setStartDate(data[index].startDate)
                    setEndDate(data[index].endDate)
                }}onMouseEnter={()=>{
                    setShowState('shown')
                }}
                onMouseLeave={()=>{
                    setShowState('hidden')
                }}>
                    <h4>
                        {`${element.startDate} 
                        ${element.endDate}`}
                    </h4><br/>
                    <h4 className="chooseTitle">
                        {element.title}
                    </h4>
                    <div className={`${showState} descriptionDiv`}>{element.content}</div>  
                </div>
            ))}
            </div><br/>
        <form action='/reserve' method="post">
            <label htmlFor="startDate">Please click on a time that fits you</label><br/>
            <input type="text" name="startDate" id="startDate"value={startDate} placeholder="start-time" readOnly />
            <input type="text" name="endDate" id="endDate"value={endDate} placeholder="end-time" readOnly /> <br/><br/>

            <label htmlFor="participants">participants</label><br/>
            <input type="text" name="participants" id="participants" placeholder="participants"/><br/><br/>

            <label htmlFor="title">title</label><br/>
            <input type="text" name="title" id="title" placeholder="title"/><br/><br/>

            <label htmlFor="content">description</label><br/>
            <input type="text" name="content" id="content" placeholder="description"/>

           
            <input type="submit" value='Choose time' />
        </form>
        </div>
    )
}