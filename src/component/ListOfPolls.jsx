import React, { useContext, useEffect, useState } from 'react';
import { listPolls, votePoll } from '../service/PollService';
import { usePollContext } from '../context/PollContext';
import { formatTimeRelative } from '../Utils/formatTimeRelative';
import { AuthContext } from '../context/AuthContex';

const ListOfPolls = () => {
    const { polls, setPolls } = usePollContext();
    const [sortOption, setSortOption] = useState('newest');
    const [loading, setLoading] = useState(true);
    const [votingPolls, setVotingPolls] = useState(new Set());

    const { user } = useContext(AuthContext);

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

    const handleVotes = (pollId, optionIndex, username) => {
        if (votingPolls.has(pollId)) return;

        setVotingPolls(prev => new Set(prev).add(pollId));

        const vote = { pollId, optionIndex, username };
        votePoll(vote)
            .then(() => {
                const updatedPolls = polls.map(poll => {
                    if (poll.id === pollId) {
                        const updatedOptions = poll.options.map((option, index) => {
                            if (index === optionIndex) {
                                const isVoted = option.voters && option.voters.includes(username);
                                return {
                                    ...option,
                                    voteCount: isVoted ? option.voteCount - 1 : option.voteCount + 1,
                                    voters: isVoted
                                        ? option.voters.filter(voter => voter !== username)
                                        : [...option.voters, username],
                                };
                            }
                            return option;
                        });
                        return { ...poll, options: updatedOptions };
                    }
                    return poll;
                });
                setPolls(updatedPolls);
                setVotingPolls(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(pollId);
                    return newSet;
                });
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
                return b.options.reduce((sum, o) => sum + o.voteCount, 0) - a.options.reduce((sum, o) => sum + o.voteCount, 0);
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
                                {poll.options?.map((option, index) => {
                                    const isVoted = option.voters?.includes(user?.name);
                                    return (
                                        <li
                                            key={index}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <span>{option?.voteOption}</span>
                                            <button
                                                className={`btn btn-outline-primary btn-sm ${isVoted ? 'btn-danger' : ''}`}
                                                onClick={() => handleVotes(poll.id, index, user?.name)}
                                                disabled={votingPolls.has(poll.id)}
                                                style={getButtonStyles(isVoted)}
                                            >

                                                {isVoted ? `Unvote (${option.voteCount})` : `Vote (${option.voteCount})`}

                                            </button>
                                        </li>
                                    );
                                })}
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

const getButtonStyles = (isVoted) => ({
    transition: 'background-color 0.3s ease',
    backgroundColor: isVoted ? '#007bff' : '',
    color: isVoted ? 'black' : '',
});

export default ListOfPolls;
