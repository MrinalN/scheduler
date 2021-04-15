import InterviewerList from "components/InterviewerList";


  export function getAppointmentsForDay(state, day) {
    let appointmentsForDay = state.days.find(sDay => sDay.name === day);

    return !appointmentsForDay ? []: appointmentsForDay.appointments.map(apptForDayIndex => state.appointments[apptForDayIndex]);
  }


  export function getInterview(state, interview) {
    if (!interview) {
      return null;
    }
    //function should return a new object containing the interview data when we pass it an object that contains the interviewer. Otherwise, the function should return null.

    return { 
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }