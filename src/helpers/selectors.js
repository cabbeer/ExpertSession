export function getAppointmentsForDay(state, day) {
    const findDay = state.days.find(individualDay => individualDay.name === day);
    if (state.days.length === 0 || !findDay) {
      return [];
    }
    return findDay.appointments.map(id => state.appointments[id])
  }
  
  export function getInterview(state, appointmentInterview) {
    if (!appointmentInterview) {
      return null;
    }
    const newInterviewObj = { ...appointmentInterview }
    const interviewerID = appointmentInterview.interviewer;
    newInterviewObj.interviewer = state.interviewers[`${interviewerID}`];
    return newInterviewObj;
  }
  
  export function getInterviewersForDay(state, day) {
    const findDay = state.days.find(individualDay => individualDay.name === day);
    if (state.days.length === 0 || !findDay) {
      return [];
    }
    return findDay.interviewers.map(id => state.interviewers[id]);
  }