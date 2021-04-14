// import React from "react";
import React, { useState, useEffect } from "react";

import "./Application.scss";
import Appointment from "./Appointment/index.js";
import DayList from "./DayList";

const axios = require('axios');
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "12pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Bob Dylan",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
  {
    id: 5,
    time: "11am",
    interview: {
      student: "Archie Bunker",
      interviewer: {
        id: 1,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState("Monday");

  useEffect(() => {
    const daysURL = '/api/days';
    axios.get(daysURL).then(response => {
      console.log(response);
      setDays([...response.data])
    });
  }, [])

  const parsedAppointments = appointments.map(appointment => 
    <Appointment key={appointment.id} {...appointment} />
    )
  return (
    <main className="layout">
      <section className="sidebar">
        {<>
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
             days={days} 
             day={day} 
             setDay={setDay}
            />
          </nav>
          <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
          />
        </>}
      </section>
      <section className="schedule">
          <li>
            {parsedAppointments}
            <Appointment key="last" time="5pm" />
          </li>
      </section>
    </main>
  );
}

