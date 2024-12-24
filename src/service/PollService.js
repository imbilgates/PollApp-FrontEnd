import axios from "axios"


export const listPolls  = () => axios.get("/api/polls");

export const createPoll  = (poll) => axios.post("/api/polls", poll, {withCredentials: true});

export const votePoll  = (vote) => axios.post('/api/polls/vote', vote);

export const getPollById  = (poll_id) => axios.get('/', poll_id);

export const getAllPollsByEmail  = () => axios.get('/api/polls/by-email', {withCredentials: true});



