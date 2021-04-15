// import React from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import React, { useState, useEffect } from "react";

import "./Application.scss";
import Appointment from "./Appointment/index.js";
import DayList from "./DayList";


const axios = require('axios');


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });

  //displays daily appointments 
  const dailyAppointments = getAppointmentsForDay(state, state.day);
 
  

  useEffect(() => {

    let getDays = '/api/days'
    let getAppointments = '/api/appointments'
    let getInterviewers = '/api/interviewers'

    const promise1 = axios.get(getDays);
    const promise2 = axios.get(getAppointments);
    const promise3 = axios.get(getInterviewers);

    Promise.all([promise1, promise2, promise3]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, [])


  const parsedAppointments = dailyAppointments.map(appointment => (
    <Appointment key={appointment.id} {...appointment} />
    ))
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
             days={state.days} 
             day={state.day} 
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

