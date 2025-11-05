import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [stats, setStats] = useState({
    totalRuns: 0,
    totalDistance: 0,
    totalDuration: 0,
    totalCalories: 0,
    avgSpeed: 0,
    avgPace: 0
  });
  const [myStats, setMyStats] = useState({
    totalRuns: 0,
    totalDistance: 0,
    totalDuration: 0,
    totalCalories: 0,
    avgSpeed: 0,
    avgPace: 0
  });
  const [chartData, setChartData] = useState([]);
  const [showMyStats, setShowMyStats] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'runs'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const runs = snapshot.docs.map(doc => doc.data());
      const myRuns = runs.filter(run => run.userId === auth.currentUser?.uid);
      
      // All runs stats
      if (runs.length > 0) {
        const totalDistance = runs.reduce((sum, run) => sum + (run.distance || 0), 0);
        const totalDuration = runs.reduce((sum, run) => sum + (run.duration || 0), 0);
        const totalCalories = runs.reduce((sum, run) => sum + (run.calories || 0), 0);
        const avgSpeed = runs.reduce((sum, run) => sum + (run.speedKmh || 0), 0) / runs.length;
        const avgPace = runs.reduce((sum, run) => sum + (run.paceMinKm || 0), 0) / runs.length;

        setStats({
          totalRuns: runs.length,
          totalDistance: totalDistance.toFixed(2),
          totalDuration: totalDuration.toFixed(0),
          totalCalories: totalCalories,
          avgSpeed: avgSpeed.toFixed(2),
          avgPace: avgPace.toFixed(2)
        });
      }

      // My runs stats
      if (myRuns.length > 0) {
        const myTotalDistance = myRuns.reduce((sum, run) => sum + (run.distance || 0), 0);
        const myTotalDuration = myRuns.reduce((sum, run) => sum + (run.duration || 0), 0);
        const myTotalCalories = myRuns.reduce((sum, run) => sum + (run.calories || 0), 0);
        const myAvgSpeed = myRuns.reduce((sum, run) => sum + (run.speedKmh || 0), 0) / myRuns.length;
        const myAvgPace = myRuns.reduce((sum, run) => sum + (run.paceMinKm || 0), 0) / myRuns.length;

        setMyStats({
          totalRuns: myRuns.length,
          totalDistance: myTotalDistance.toFixed(2),
          totalDuration: myTotalDuration.toFixed(0),
          totalCalories: myTotalCalories,
          avgSpeed: myAvgSpeed.toFixed(2),
          avgPace: myAvgPace.toFixed(2)
        });
      }

      // Chart data
      const dataForChart = showMyStats ? myRuns : runs;
      const sortedRuns = dataForChart
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(-10);
      
      const chartData = sortedRuns.map(run => ({
        date: run.date,
        distance: run.distance,
        speed: run.speedKmh
      }));
      
      setChartData(chartData);
    });

    return () => unsubscribe();
  }, [showMyStats]);

  const currentStats = showMyStats ? myStats : stats;

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '25px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937'
        }}>Dashboard</h2>
        
        <button
          onClick={() => setShowMyStats(!showMyStats)}
          style={{
            background: showMyStats ? '#10b981' : '#3b82f6',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {showMyStats ? 'Show All Runs' : 'Show My Runs Only'}
        </button>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        marginBottom: '30px'
      }}>
        <StatCard label="Total Runs" value={currentStats.totalRuns} color="#3b82f6" />
        <StatCard label="Total Distance" value={`${currentStats.totalDistance} km`} color="#10b981" />
        <StatCard label="Total Duration" value={`${currentStats.totalDuration} min`} color="#8b5cf6" />
        <StatCard label="Total Calories" value={`${currentStats.totalCalories} kcal`} color="#ef4444" />
        <StatCard label="Avg Speed" value={`${currentStats.avgSpeed} km/h`} color="#f59e0b" />
        <StatCard label="Avg Pace" value={`${currentStats.avgPace} min/km`} color="#6366f1" />
      </div>

      {chartData.length > 0 && (
        <div style={{
          background: 'white',
          borderRadius: '10px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          padding: '25px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#1f2937'
          }}>Recent Performance {showMyStats && '(My Runs)'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="distance" stroke="#10b981" name="Distance (km)" />
              <Line yAxisId="right" type="monotone" dataKey="speed" stroke="#3b82f6" name="Speed (km/h)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '10px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '20px'
    }}>
      <p style={{
        color: '#6b7280',
        fontSize: '14px',
        marginBottom: '8px'
      }}>{label}</p>
      <p style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: color
      }}>{value}</p>
    </div>
  );
}

export default Dashboard;
