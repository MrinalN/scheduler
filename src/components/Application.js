import React from "react";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import "./Application.scss";
import Appointment from "./Appointment/index.js";
import DayList from "./DayList";
import useApplicationData from 'hooks/useApplicationData.js';


export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  /* displays daily appointments */ 
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  /* parses through daily appointments to send props */
  const parsedAppointments = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />)
    })
   
  /* Layout for navigation with DayList data. Adds static end of day apointment (5pm) */  
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
            <Appointment 
            key="last" 
            time="5pm" />
          </li>

      </section>
    </main>
  );
  
}

