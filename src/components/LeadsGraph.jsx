'use client'

import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useRouter } from 'next/navigation';

const COLORS = ['#126b34', '#ff0000', '#5f6066'];

export default function LeadsGraph() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            try {

                // Get token from localStorage
                const token = sessionStorage.getItem('adminToken');
                if (!token) {
                    setError('No authentication token found');
                    setLoading(false);
                    return;
                }

                const res = await fetch('/api/dashboard/leads-graph', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const json = await res.json();
                if (json.status === 'success' && Array.isArray(json.data)) {
                    setData(json.data);
                } else {
                    setError(json.message || 'Failed to fetch data');
                }
            } catch (err) {
                router.push('/login');
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
                <PieChart width={1000} height={1000}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
