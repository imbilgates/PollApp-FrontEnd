import React, { useEffect } from 'react';
import { listPolls, votePoll } from '../service/PollService';
import { usePollContext } from '../context/PollContext';
import { formatTimeRelative } from '../Utils/formatTimeRelative';

const ListOfPolls = () => {

    const { polls, setPolls } = usePollContext();

    useEffect(() => {
        listPolls()
            .then(poll => {
                setPolls(poll.data);
            })
            .catch(err => console.log(err));
    }, [setPolls, polls]);

    const handleVotes = (pollId, pollIndex) => {

        const vote = {
            pollId: pollId,
            optionIndex: pollIndex
        };

        votePoll(vote)
            .then(() => {
                const updatedPolls = polls.map(poll => {
                    if (poll.id === pollId) {
                        const updatedOptions = poll.options.map((option, index) => {
                            if (index === pollIndex) {
                                return { ...option, voteCount: option.voteCount + 1 };
                            }
                            return option;
                        });
                        return { ...poll, options: updatedOptions };
                    }
                    return poll;
                });
                setPolls(updatedPolls);
            })
            .catch(err => console.log(err));
    };


    if (!Array.isArray(polls)) {
        return <p>Loading...</p>; // Show loading if polls is not an array
    }

    return (
        <div className="container mt-4">
            {polls.length > 0 ? (
                polls
                    .map((poll) => (
                        <div key={poll.id} className="card mb-4 shadow-sm">
                            <div className="card-header d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={poll.picture}
                                        alt="Profile"
                                        className="rounded-circle me-3"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <h5 className="mb-0">@{poll.username}</h5>
                                </div>
                                <small className="text-muted">
                                    {formatTimeRelative(poll.createdAt).toLocaleString()}
                                </small>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">{poll.question}</h3>
                                <ul className="list-group">
                                    {poll.options?.map((option, index) => (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <span>{option?.voteOption}</span>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => handleVotes(poll.id, index)}
                                            >
                                                Votes ({option?.voteCount})
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))
                    .reverse()
            ) : (
                <p className="text-muted text-center">No polls available</p>
            )}
        </div>
    );
    
    
};

export default ListOfPolls;
