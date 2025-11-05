import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

function RunList() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'runs'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const runsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRuns(runsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this run?')) {
      try {
        await deleteDoc(doc(db, 'runs', id));
      } catch (error) {
        alert('Error deleting run: ' + error.message);
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '30px' }}>Loading runs...</div>;
  }

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
      }}>Run History</h2>
      
      {runs.length === 0 ? (
        <p style={{
          color: '#6b7280',
          textAlign: 'center',
          padding: '30px'
        }}>No runs yet. Add your first run!</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Runner</th>
                <th style={thStyle}>Distance</th>
                <th style={thStyle}>Duration</th>
                <th style={thStyle}>Speed</th>
                <th style={thStyle}>Pace</th>
                <th style={thStyle}>Calories</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={tdStyle}>{run.date}</td>
                  <td style={tdStyle}>{run.userEmail?.split('@')[0]}</td>
                  <td style={tdStyle}>{run.distance} km</td>
                  <td style={tdStyle}>{run.duration} min</td>
                  <td style={tdStyle}>{run.speedKmh} km/h</td>
                  <td style={tdStyle}>{run.paceMinKm} min/km</td>
                  <td style={tdStyle}>{run.calories} kcal</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(run.id)}
                      style={{
                        color: '#ef4444',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '14px',
  fontWeight: '500',
  color: '#374151'
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: '14px',
  color: '#111827'
};

export default RunList;
