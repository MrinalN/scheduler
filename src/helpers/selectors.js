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

  export function getInterviewersForDay (state, day) {
   let currentDay = state.days.find(sDay => sDay.name === day);
   console.log('CURRENT DAY FUNC:',currentDay)

   return !currentDay ? []: currentDay.interviewers.map(apptForDayIndex => state.interviewers[apptForDayIndex]);
  }

//SPOTS FOR DAY function
  // export function getSpotsForDay(state, day) {
  //   let spotsForDay = state.days.find(sDay => sDay.name === day);

  //   return !appointmentsForDay ? []: appointmentsForDay.appointments.map(spotsForDayIndex => state.appointments[spotsForDayIndex]);
  // }