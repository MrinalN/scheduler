
import { useState, useEffect } from "react";
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
 
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    /* grabs an array copy so not to mutate original state */
    const days = [...state.days].map(day => (
      {...day}
      ));

    /* alter object in copy */
    const matchDayObj = days.filter((day) => state.day === day.name)[0]
    if(!state.appointments[id].interview) {matchDayObj.spots--}
    

    /* setState */
    return axios.put(`api/appointments/${id}`, appointment)
    .then(() => setState({
      ...state,
      appointments,
      days
    }))
  }

  function cancelInterview (id) {
   /* updaties the state locally to reflect the remote deletion */
    const appointment = {
    ...state.appointments[id],
    interview: null
  };
  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const days = [...state.days]

  const matchDayObj = days.filter((day) => state.day === day.name)[0]
  matchDayObj.spots++

  return axios.delete(`api/appointments/${id}`, appointment)
  .then(() => setState({
    ...state,
    appointments,
    days
  }))
}

return { 
  state,
  setDay,
  bookInterview,
  cancelInterview
};
}