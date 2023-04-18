import React from 'react';
import { Link } from 'react-router-dom';

const ServerRow = ({ item, flashClass }) => {
  const iconUrl = `https://cdn.discordapp.com/icons/${item.guild_id}/${item.icon}.png`;
  const serverName = item.guild_name;
  const serverId = item.guild_id;
  const messageCount = item.message_count;
  const activeUsers = item.unique_authors;
  const reactionCount = item.total_reactions;
  const createdAt = item.created_at;

  return (
    <tr className='row'>
      <td>
        <Link to={`/server/${serverId}`} className="server-link">
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
