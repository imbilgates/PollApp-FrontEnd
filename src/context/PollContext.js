import { createContext, useContext, useState } from "react";


const PollContext = createContext();

const PollContextProvider = ({ children }) => {

    const [polls, setPolls] = useState([]);

    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const obj = {
        polls,
        setPolls,
        question,
        setQuestion,
        options,
        setOptions
    }

    return (
        <PollContext.Provider value={obj}>
            {children}
        </PollContext.Provider>
    );
};


const usePollContext = () => {
    const context = useContext(PollContext);
    if (!context) {
        throw new Error("usePollContext must be used within a PollContextProvider");
    }
    return context;
};

export { PollContextProvider, usePollContext };
