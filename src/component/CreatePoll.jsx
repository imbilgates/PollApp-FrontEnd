import React, { useState } from 'react';
import { createPoll } from '../service/PollService';
import { usePollContext } from '../context/PollContext';

const CreatePoll = () => {
  const { question, setQuestion, options, setOptions, setPolls } = usePollContext();
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const pollData = {
      question,
      options: options
        .filter((option) => option.trim() !== '') // Filter out empty options
        .map((option) => ({ voteOption: option, voteCount: 0 })) // Create objects with voteOption and voteCount
    };

    createPoll(pollData)
      .then((newPoll) => {
        console.log('Poll created successfully');
        setPolls((prevPolls) => [newPoll.data, ...prevPolls]);
        setQuestion('');
        setOptions(['', '']);
      })
      .catch((err) => {
        console.log('Error creating poll:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Poll Question</label>
          <input
            type="text"
            className="form-control"
            value={question}
            onChange={handleQuestionChange}
            placeholder="Enter the question"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Options</label>
          {options?.map((option, index) => (
            <div key={index} className="input-group mb-2">
              <input
                type="text"
                className="form-control"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveOption(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-success me-2" onClick={handleAddOption}>
          Add New Option
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
            Loading...
            <span className="spinner-border spinner-grow-sm" role="status" aria-hidden="true"></span></>
          ) : (
            'Create Poll'
          )}
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
