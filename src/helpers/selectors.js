export function getAppointmentsForDay(state, day) {
    const daySearch = state.days.find(individualDay => individualDay.name === day);
    if (state.days.length === 0 || !daySearch) {
      return [];
    }
    return daySearch.appointments.map(id => state.appointments[id])
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
    const daySearch = state.days.find(individualDay => individualDay.name === day);
    if (state.days.length === 0 || !daySearch) {
      return [];
    }
    return daySearch.interviewers.map(id => state.interviewers[id]);
  }