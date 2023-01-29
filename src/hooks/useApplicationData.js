import axios from "axios";

import { useState, useEffect } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data,}));});
  }, []);

  function refreshCount(apptID, cancelAppt = false) {
    const selectedDay = state.days.filter(day => day.appointments.includes(apptID))[0];
    let count = selectedDay.spots;

    if (state.appointments[apptID].interview !== null && !cancelAppt) {
      return state.days;
    }

    cancelAppt ? count++ : count--;

    const newDays = [ ...state.days ];
    newDays.find(newDay => newDay === selectedDay).spots = count;
    return newDays;
  }
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = refreshCount(id); 

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState((prevState) => ({ ...prevState, appointments, days }));
      });
  }

  function cancelInterview(id) {
    let freshAppointment = { ...state.appointments[id], interview: null };
    const appointments = { ...state.appointments, [id]: freshAppointment };


    const days = refreshCount(id, true);
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        setState((prevState) => ({ ...prevState, appointments, days }));
      });
  }


  return { 
    state,
    setDay,
    bookInterview,
    cancelInterview 
  };
}
