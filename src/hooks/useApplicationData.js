
import React, { useState, useEffect } from "react";
import axios from 'axios';



export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
    
  }); 
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {

    let getDays = '/api/days'
    let getAppointments = '/api/appointments'
    let getInterviewers = '/api/interviewers'

    Promise.all([
      axios.get(getDays), 
      axios.get(getAppointments), 
      axios.get(getInterviewers)
    ])
    .then((all) => {
      setState(prev => ({...prev, 
        days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data 
      }));
    });
    
  }, [])


  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`api/appointments/${id}`, appointment)
    .then(() => setState({
      ...state,
      appointments
    }))
  }

  function cancelInterview (id) {
    // updaties the state locally to reflect the remote deletion
    const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };
  return axios.delete(`api/appointments/${id}`, appointment)
  .then(() => setState({
    ...state,
    appointments
  }))
}
return { 
  state,
  setDay,
  bookInterview,
  cancelInterview
};
}