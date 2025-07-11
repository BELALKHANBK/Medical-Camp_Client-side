import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

import useAuth from '../AuthProvider/UseAuth';
import useAxiosSecure from '../AuthProvider/UseAxios';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        padding: '10px 15px',
        borderRadius: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        color: '#333',
        fontWeight: '600',
      }}>
        <p style={{ margin: 0 }}>{label}</p>
        <p style={{ margin: 0, marginTop: 4, color: '#16a34a' }}>Fee: ${payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// তুমি রঙের জন্য ইচ্ছে মতো রঙের অ্যারে বানাতে পারো
const COLORS = [
  '#22c55e', // green
  '#3b82f6', // blue
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // purple
  '#14b8a6', // teal
  '#f43f5e', // pink
  '#6366f1', // indigo
];

const Analytics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: registeredCamps = [], isLoading } = useQuery({
    queryKey: ['registeredCamps', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`joine/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const chartData = registeredCamps.map(camp => ({
    name: camp.campName || 'Unnamed',
    fee: Number(camp.fees) || 0,
  }));

  return (
    <div style={{
      maxWidth: 700,
      margin: '40px auto',
      padding: 20,
      backgroundColor: '#fefefe',
      borderRadius: 20,
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
        color: '#111',
      }}>
        📈 Camp Registration Analytics
      </h2>

      <p style={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 25,
        color: '#16a34a',
      }}>
        Total Joined Camps: {registeredCamps.length}
      </p>

      {isLoading ? (
        <p style={{ textAlign: 'center', color: '#888' }}>Loading...</p>
      ) : chartData.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No camps registered yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={chartData}
            margin={{ top: 15, right: 30, left: 20, bottom: 70 }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 13, fill: '#444', fontWeight: 600 }}
              angle={-30}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis
              tick={{ fontSize: 13, fill: '#444', fontWeight: 600 }}
              tickFormatter={val => `$${val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="fee"
              radius={[10, 10, 0, 0]}
              barSize={40}
              style={{ filter: 'drop-shadow(0 2px 2px rgba(34,197,94,0.4))' }}
            >
              {
                chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Analytics;
