import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const TotalMessageCount = () => {
  const [messageData, setMessageData] = useState(0);

  const fetchServerDetails = async () => {
    try {
      const response = await fetch('/api/total_message_count');
      const data = await response.json();
      setMessageData(data);
    } catch (error) {
      console.error('Error fetching server details:', error);
    }
  };

  useEffect(() => {
    fetchServerDetails();
  }, []);

  return (
    <div className='chart'>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={messageData}>
          <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="right" tick={{ fontSize: 12 }} orientation="right" />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} orientation="left" />
          <Tooltip
            contentStyle={{ backgroundColor: '#27282b', fontSize: "12px" }}
            itemStyle={{ color: '#fff' }}
            labelStyle={{ display: 'none' }}
          />
          <Legend wrapperStyle={{ fontSize: "14px" }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Message Count"
            stroke="#f5b031"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={{ stroke: '#f5b031', strokeWidth: 1, r: 4 }}
            animationDuration={1000}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Active Users" // Change this to the data key you want to represent with the blue line
            stroke="#2179b5"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            dot={{ stroke: '#2179b5', strokeWidth: 1, r: 4 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalMessageCount;
