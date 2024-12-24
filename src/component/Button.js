import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import add from '../assets/add.png';
import list from '../assets/list.png';

const Button = () => {
  const navigate = useNavigate(); 

  const handleAddClick = () => {
    navigate('/polls'); 
  };

  const handleListClick = () => {
    navigate('/user'); 
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <button onClick={handleAddClick} className="btn p-0 m-2">
        <img src={add} alt="Add Poll" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </button>

      <button onClick={handleListClick} className="btn p-0 m-2">
        <img src={list} alt="List Polls" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
      </button>
    </div>
  );
};

export default Button;
