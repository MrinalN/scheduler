  
  /* Locates appointments array in day that matches parameter input. Returns empty array if not found.  */
  export function getAppointmentsForDay(state, day) {
    let appointmentsForDay = state.days.find(sDay => sDay.name === day);
    

    return !appointmentsForDay ? []: appointmentsForDay.appointments.map(apptForDayIndex => state.appointments[apptForDayIndex]);
  }


  /* Returns Interview object details or null if not booked */
  export function getInterview(state, interview) {
    if (!interview) {
      return null;
    }

    return { 
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }

  /* Locates interviewers array in day that matches parameter input. Returns empty array if not found.. */
  export function getInterviewersForDay(state, day) {
    const currentDay = state.days.find(sDay => day === sDay.name);
  
    if (state.days.length === 0 || !currentDay) return [];
  
    return currentDay.interviewers.map(id => state.interviewers[id]);
  }

