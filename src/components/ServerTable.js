import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import ServerRow from './ServerRow';
import WebSocket from 'isomorphic-ws';
import Cookies from 'js-cookie';

const ServerTable = ({ token, headerFilter }) => {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/get-messages', { credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        } }
        )
        const messages = await response.json();
        setData(messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);


  useEffect(() => {
  const socket = new WebSocket('ws://localhost:4001');

  socket.addEventListener('open', (event) => {
    console.log('WebSocket connected:', event);
  });

  socket.addEventListener('message', (event) => {
    console.log('WebSocket message received:', event);

    const newPost = JSON.parse(event.data);
    setData((prevData) => [...prevData, newPost]);
  });

  socket.addEventListener('close', (event) => {
    console.log('WebSocket closed:', event);
  });

  socket.addEventListener('error', (event) => {
    console.log('WebSocket error:', event);
  });

  return () => {
    socket.close();
  };
}, []);


  const handleSubmit = () => {
    let hex = Math.floor(Math.random()*16777215).toString(16);
    const newItem = {
      icon: hex,
      question: inputValue,
      timestamp: Date.now(),
      messageCount: 0,
      responders: 0,
      reactionCount: 0,
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
  {token && (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask a question"
            style={{ width: '200px', marginRight: '10px' }}
          />
          <button
            onClick={handleSubmit}
            style={{
              border: '1px solid #ccc',
              borderRadius: '3px',
              color: '#333',
              cursor: 'pointer',
              fontSize: '14px',
              outline: 'none',
              marginRight: '10px',
              marginTop: '10px',
            }}
          >
            Start Discussion
          </button>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>question</th>
            <th>likes</th>
            <th>created</th>
          </tr>
        </thead>
        <tbody>
        {[...data].reverse().map((item, index) => {
  return <ServerRow key={index} item={item} />;
})}
        </tbody>
      </table>
    </>
  );
};

export default ServerTable;
