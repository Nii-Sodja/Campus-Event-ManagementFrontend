import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PreferencesPage = () => {
    const navigate = useNavigate();
    const [preferences, setPreferences] = useState({
        sports: false,
        academic: false,
        social: false,
        cultural: false,
        technology: false
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('User');
        if (!user) {
            navigate('/login');
            return;
        }
        fetchUserPreferences();
    }, [navigate]);

    const fetchUserPreferences = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/users/preferences', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.preferences) {
                setPreferences(response.data.preferences);
            }
        } catch (error) {
            console.error('Error fetching preferences:', error);
            setError('Failed to load preferences. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            setError(null);
            const token = localStorage.getItem('token');
            await axios.post(
                'http://localhost:3000/api/users/preferences',
                { preferences },
                { headers: { Authorization: `Bearer ${token}` }}
            );

            // Update user preferences in localStorage
            const user = JSON.parse(localStorage.getItem('User'));
            user.preferences = preferences;
            localStorage.setItem('User', JSON.stringify(user));

            alert('Preferences saved successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error saving preferences:', error);
            setError('Failed to save preferences. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div>
                <NavBar />
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h1 className="text-2xl font-bold mb-6">Event Preferences</h1>
                    <p className="text-gray-600 mb-6">
                        Select the types of events you're interested in. We'll prioritize showing you these events.
                    </p>
                    
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {Object.keys(preferences).map((pref) => (
                            <div 
                                key={pref} 
                                className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    id={pref}
                                    checked={preferences[pref]}
                                    onChange={(e) => setPreferences({
                                        ...preferences,
                                        [pref]: e.target.checked
                                    })}
                                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                                    disabled={saving}
                                />
                                <label 
                                    htmlFor={pref} 
                                    className="ml-2 text-gray-700 capitalize cursor-pointer select-none"
                                >
                                    {pref} Events
                                </label>
                            </div>
                        ))}
                        <div className="flex gap-4 mt-6">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="w-1/2 px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                disabled={saving}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`w-1/2 px-5 py-2 rounded-lg ${
                                    saving 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-black hover:bg-gray-800'
                                } text-white`}
                                disabled={saving}
                            >
                                {saving ? 'Saving...' : 'Save Preferences'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PreferencesPage;