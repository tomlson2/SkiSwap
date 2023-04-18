import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const ServerRow = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const iconUrl = `https://singlecolorimage.com/get/${item.icon}/400x100.png`;
  const serverName = (
    <span className="server-text" onClick={toggleDropdown}>
      {item.question}
    </span>
  );
  const messageCount = item.messageCount;
  const responders = item.responders;
  const [reactionCount, setReactionCount] = useState(item.reactionCount);
  const createdAt = moment(item.timestamp).fromNow();

  const handleLike = async () => {
    try {
      const response = await axios.put(`/api/question/${item.id}/like`);
      setReactionCount(reactionCount + 1);
    } catch (error) {
      console.error('Error updating reaction count:', error);
    }
  };
  return (
    <tr className='row'>
      <td>
          <img src={iconUrl} alt="Server Icon" className="server-icon" />
          <span className="server-text">{serverName}</span>
          {isDropdownOpen && (
            <div className="dropdown">
              {/* Dropdown content goes here */}
            </div>
          )}
      </td>
      <td>{messageCount}</td>
      <td>{responders}</td>
      <td>
        {reactionCount}
        <button onClick={handleLike} className="like-button">Like</button>
      </td>
      <td>{createdAt}</td>
    </tr>
  );
};

export default ServerRow;
