import React, { useState } from 'react';
import './Dropdown.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState('');

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle adding the comment to the server/database
    console.log(comment);
    setComment('');
  };

  return (
        <div className="dropdown-content">
          <div className="comment-list">
            <div className="comment-item">Comment 1</div>
            <div className="comment-item">Comment 2</div>
            <div className="comment-item">Comment 3</div>
          </div>
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              className="comment-input"
              value={comment}
              onChange={handleInputChange}
              placeholder="Add a comment"
            />
            <button type="submit" className="comment-submit">
              Send
            </button>
          </form>
        </div>
      )
};

export default Dropdown;
