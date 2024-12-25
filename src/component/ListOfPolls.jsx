import React, { useEffect, useState } from 'react';
import { listPolls, votePoll } from '../service/PollService';
import { usePollContext } from '../context/PollContext';
import { formatTimeRelative } from '../Utils/formatTimeRelative';

const ListOfPolls = () => {
    const { polls, setPolls } = usePollContext();
    const [sortOption, setSortOption] = useState('newest');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listPolls()
            .then(poll => {
                setPolls(poll.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [setPolls]);

    const handleVotes = (pollId, pollIndex) => {
        const vote = { pollId, optionIndex: pollIndex };
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

    const sortedPolls = [...polls].sort((a, b) => {
        switch (sortOption) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'popular':
                return b.options.reduce((sum, o) => sum + o.voteCount, 0) -
                       a.options.reduce((sum, o) => sum + o.voteCount, 0);
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <div className="d-flex justify-content-center" style={{ height: '100vh' }}>
                <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            </div>
        );
    }

    if (!Array.isArray(polls)) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-end mb-3">
                <select
                    className="form-select w-auto"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="popular">Most Popular</option>
                </select>
            </div>

            {sortedPolls.length > 0 ? (
                sortedPolls.map((poll) => (
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
            ) : (
                <p className="text-muted text-center">No polls available</p>
            )}
        </div>
    );
};

export default ListOfPolls;
