import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ServerRow = ({ item }) => {
  const iconUrl = `https://singlecolorimage.com/get/${item.icon}/400x100.png`;
  const serverName = item.question;
  const messageCount = item.messageCount;
  const responders = item.responders;
  const [reactionCount, setReactionCount] = useState(item.reactionCount);
  const createdAt = item.timestamp;

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
        <Link to={`/question/${item._id}`} className="server-link">
          <img src={iconUrl} alt="Server Icon" className="server-icon" />
          <span className="server-text">{serverName}</span>
        </Link>
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
