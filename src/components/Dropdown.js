import React, { useState, useEffect } from 'react';
import './Dropdown.css';
import axios from 'axios';

const Dropdown = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`/api/${postId}/comment`, {
        content: comment,
      });
      setComments((prevComments) => [...prevComments, response.data]);
      setComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="dropdown">
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            {comment.content}
          </div>
        ))}
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
  );
};

export default Dropdown;
