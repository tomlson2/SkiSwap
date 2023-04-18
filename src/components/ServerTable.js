import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import ServerRow from './ServerRow';

const ServerTable = ({ headerFilter, timeFilter }) => {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchData = () => {
    let req = '';

    if (timeFilter) {
      let startDate = new Date();
      let hoursToSubtract = parseInt(timeFilter);

      startDate.setHours(startDate.getHours() - hoursToSubtract);

      req = `?start_date=${startDate.toISOString()}`;
    }
    return req;
  };

  const handleSubmit = () => {
    let hex = Math.floor(Math.random()*16777215).toString(16);
    const newItem = {
      icon: hex,
      question: inputValue,
      timestamp: Date.now(),
      response_count: 0,
      respondants: 0,
      total_reactions: 0,
    };

    $.ajax({
      url: '/api/post',
      type: 'POST',
      data: JSON.stringify(newItem),
      contentType: 'application/json',
      success: () => {
        setData([...data, newItem]);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });

    setInputValue('');
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask a question"
        style={{ marginRight: '10px' }}
      />
      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid #ccc',
          borderRadius: '3px',
          color: '#333',
          cursor: 'pointer',
          fontSize: '14px',
          padding: '5px 10px',
          outline: 'none',
          marginRight: '10px',
        }}
      >
        Add Row
      </button>
      <table>
        <thead>
          <tr>
            <th>question</th>
            <th>responses</th>
            <th>responders</th>
            <th>reactions</th>
            <th>created</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const prevItem = prevData[index];
            let flashClass = '';

            if (prevItem) {
              if (item.message_count > prevItem.message_count) {
                flashClass = 'flash-green';
              } else if (item.message_count < prevItem.message_count) {
                flashClass = 'flash-red';
              }
            }

            return <ServerRow key={index} item={item} flashClass={flashClass} />;
          })}
        </tbody>
      </table>
    </>
  );
};

export default ServerTable;
