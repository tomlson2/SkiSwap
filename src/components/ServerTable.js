import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import ServerRow from './ServerRow';

const ServerTable = ({ headerFilter, timeFilter }) => {
  const [data, setData] = useState([]);
  const [prevData, setPrevData] = useState([]);

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

  const updateData = () => {
    const req = fetchData();
    $.getJSON(`/api/data${req}`, function (data) {
      setData(data);
      setPrevData(data);
    });
  };

  useEffect(() => {
    updateData();
    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval);
  }, [timeFilter]);

  return (
    <table>
      <thead>
        <tr>
          <th>server</th>
          <th>messages</th>
          <th>active users</th>
          <th>reactions</th>
          <th>age (days)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          const prevItem = prevData[index];
          let flashClass = "";

          if (prevItem) {
            if (item.message_count > prevItem.message_count) {
              flashClass = "flash-green";
            } else if (item.message_count < prevItem.message_count) {
              flashClass = "flash-red";
            }
          }

          return <ServerRow key={index} item={item} flashClass={flashClass} />;
        })}
      </tbody>
    </table>
  );
};

export default ServerTable;
