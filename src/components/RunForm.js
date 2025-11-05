import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function RunForm({ user }) {
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);

  const calculateStats = () => {
    const dist = parseFloat(distance);
    const dur = parseFloat(duration);
    
    const speedKmh = (dist / (dur / 60)).toFixed(2);
    const paceMinKm = (dur / dist).toFixed(2);
    const calories = Math.round(dist * 60);
    
    return { speedKmh, paceMinKm, calories };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const stats = calculateStats();
      
      await addDoc(collection(db, 'runs'), {
        userId: user.uid,
        userEmail: user.email,
        distance: parseFloat(distance),
        duration: parseFloat(duration),
        date: date,
        speedKmh: parseFloat(stats.speedKmh),
        paceMinKm: parseFloat(stats.paceMinKm),
        calories: stats.calories,
        createdAt: serverTimestamp()
      });

      setDistance('');
      setDuration('');
      setDate(new Date().toISOString().split('T')[0]);
      alert('Run added successfully!');
    } catch (error) {
      alert('Error adding run: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '25px'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '25px',
        color: '#1f2937'
      }}>Add New Run</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Distance (km)
            </label>
            <input
              type="number"
              step="0.01"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Duration (minutes)
            </label>
            <input
              type="number"
              step="0.1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              required
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 15px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            background: loading ? '#9ca3af' : '#3b82f6',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Adding...' : 'Add Run'}
        </button>
      </form>
    </div>
  );
}

export default RunForm;
