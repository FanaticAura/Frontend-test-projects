// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";

function Web_Clock(){

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    function timeGetter(){
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >=12 ? "PM" : "AM";

        //показать время в англоязычном стиле
        hours = hours % 12 || 12;

        return `${getZero(hours)}:${getZero(minutes)}:${getZero(seconds)}:${meridiem}`;
    }

    function getZero(number){
        return(number < 10 ? "0" : "") + number;
    }

    return(
        <div className="clock-container">
            <div className="clock">
                <span>{timeGetter()}</span>
            </div>
        </div>
    );
}

export default Web_Clock