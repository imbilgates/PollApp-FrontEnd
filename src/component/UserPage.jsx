import React, { useEffect, useState } from 'react';
import { getAllPollsByEmail } from '../service/PollService';
import axios from 'axios';

const UserPages = () => {
    const [userPolls, setUserPolls] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllPollsByEmail()
            .then((response) => {
                setUserPolls(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("An error occurred while fetching your polls.");
                setLoading(false);
            });
    }, []);

    const handleDelete = (pollId) => {
        axios
            .delete(`/api/polls/by-email/${pollId}`, { withCredentials: true })
            .then((response) => {
                console.log(`Poll with ID ${pollId} deleted`);
                setUserPolls(userPolls.filter((poll) => poll.id !== pollId));
            })
            .catch((error) => {
                console.error("Error deleting poll:", error);
            });
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-danger">{error}</div>;
    }

    return (
        <div className="container mt-4">
            {userPolls && userPolls.length > 0 ? (
                <>
                    <p className="text-muted">You have {userPolls.length} poll(s)</p>
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Poll Question</th>
                                    <th scope="col">Options</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userPolls.map((poll) => (
                                    <tr key={poll.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span className="me-2 text-primary">{poll.username}</span>
                                                <span>{poll.question}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <ul className="list-unstyled">
                                                {poll.options?.map((option, index) => (
                                                    <li key={index}>
                                                        {option.voteOption} ({option.voteCount} votes)
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(poll.id)}
                                            >
                                                Delete Poll
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <p className='text text-center'>You Have No polls available</p>
            )}
        </div>
    );
};

export default UserPages;


