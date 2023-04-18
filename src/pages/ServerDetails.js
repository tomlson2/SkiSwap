import { React, useState, useEffect } from 'react';
import SmallHeader from '../components/SmallHeader';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ServerDetails = () => {
    const { serverId } = useParams();
    const [serverDetails, setServerDetails] = useState(null);

    const fetchServerDetails = async (serverId) => {
        try {
            const response = await fetch(`/api/server/${serverId}`);
            const data = await response.json();
            setServerDetails(data);
        } catch (error) {
            console.error('Error fetching server details:', error);
        }
    };

    useEffect(() => {
        fetchServerDetails(serverId);
    }, [serverId]);

    return (
        <div>
            <SmallHeader />
            <div>
                {serverDetails ? (
                    <div>
                        <div class="flex-container">
                            <div class="list-container">
                                <ul>
                                    <div className='guild-title'>
                                        <img src={`https://cdn.discordapp.com/icons/${serverDetails.guild_id}/${serverDetails.icon}.png`} alt="Server icon" className='details-logo' />
                                        <h1 className="guild">{serverDetails.guild_name}</h1>
                                    </div>
                                    {/* <li><strong className="highlight-number">{serverDetails.unique_users}</strong> unique chatters</li>
                                    <li><strong className="highlight-number">{serverDetails.message_count}</strong> messages sent</li>
                                    <li><strong className="highlight-number">{serverDetails.total_reactions}</strong> message reactions</li> */}
                                </ul>
                            </div>
                        </div>

                        <div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={serverDetails.message_data}>
                                    <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
                                    <YAxis tick={{ fontSize: 12 }} orientation="left" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#27282b', fontSize: "12px" }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ display: 'none' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: "14px" }} />
                                    <Line
                                        type="monotone"
                                        dataKey="message_count"
                                        stroke="#f5b031"
                                        activeDot={{ r: 8 }}
                                        strokeWidth={2}
                                        dot={{ stroke: '#f5b031', strokeWidth: 1, r: 4 }}
                                        animationDuration={1000}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className='header-container'>
                            <h2>User Breakdown</h2>
                        </div>
                        <table className='row'>
                            <thead>
                                <tr>
                                    <th>Author ID</th>
                                    <th>Message Count</th>
                                    <th>Total Reactions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {serverDetails.top_users.map(user => (
                                    <tr key={user.author_id}>
                                        <td>{user.author_id}</td>
                                        <td>{user.message_count}</td>
                                        <td>{user.total_reactions}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p>Loading server details...</p>
                )}
            </div>
        </div>
    );
};

export default ServerDetails;
