import React from 'react';
import { Link } from 'react-router-dom';

const ServerRow = ({ item, flashClass }) => {
  const iconUrl = `https://singlecolorimage.com/get/${item.icon}/400x100.png`;
  const serverName = item.question;
  const messageCount = 0;
  const activeUsers = 0;
  const reactionCount = 0;
  const createdAt = item.timestamp;

  return (
    <tr className='row'>
      <td>
        <Link to={`/question/${item.id}`} className="server-link">
          <img src={iconUrl} alt="Server Icon" className="server-icon" />
          <span className="server-text">{serverName}</span>
      </Link>
      </td>
      <td className={flashClass}>{messageCount}</td>
      <td>{activeUsers}</td>
      <td>{reactionCount}</td>
      <td>{createdAt}</td>
    </tr>
  );
};

export default ServerRow;
