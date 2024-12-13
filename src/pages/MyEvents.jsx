import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyEvents = () => {
    const userId = JSON.parse(localStorage.getItem('User'))?._id;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('User'))?.token;
                const response = await axios.get(`http://localhost:3000/api/events/user/registered`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEvents(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch events');
                setLoading(false);
            }
        };

        fetchMyEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Events</h1>
                <button
                    onClick={() => navigate('/create-event')}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                    Create New Event
                </button>
            </div>

            {events.length === 0 ? (
                <p className="text-center text-gray-500">You haven't created any events yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                        >
                            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                            <p className="text-gray-600 mb-2">{event.description}</p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                                <span>{event.location}</span>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <button
                                    onClick={() => navigate(`/edit-event/${event._id}`)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => navigate(`/event/${event._id}`)}
                                    className="text-green-600 hover:text-green-800"
                                >
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyEvents;