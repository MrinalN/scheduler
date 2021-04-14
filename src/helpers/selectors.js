

  export function getAppointmentsForDay(state, day) {
    let appointmentsForDay = state.days.find(sDay => sDay.name === day);

    return !appointmentsForDay ? []: appointmentsForDay.appointments.map(apptForDayIndex => state.appointments[apptForDayIndex]);
  }
