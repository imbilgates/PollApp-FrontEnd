import axios from "axios"


export const listPolls  = () => axios.get();

export const createPoll  = (poll) => axios.post(poll, {withCredentials: true});

export const votePoll  = (vote) => axios.post('/vote', vote);

export const getPollById  = (poll_id) => axios.get('/', poll_id);

export const getAllPollsByEmail  = () => axios.get('/by-email', {withCredentials: true});



