// frontend/src/components/common/SimpleChart.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

/**
 * Temel alan grafiği bileşeni.
 * @param {Array} data - Grafik verisi. Örn: [{name: 'Ocak', USD: 4000}]
 * @param {string} dataKey - X ekseninde kullanılacak veri anahtarı. Örn: 'name'
 * @param {string} lineKey - Çizgide kullanılacak veri anahtarı. Örn: 'USD'
 * @param {string} color - Çizgi rengi (Tailwind color string).
 */
const SimpleChart = ({ data, dataKey = 'name', lineKey = 'value', color = '#194A8D' }) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey={dataKey} tickLine={false} axisLine={false} stroke="#555" />
                <YAxis tickLine={false} axisLine={false} stroke="#555" tickFormatter={(value) => `${value}K`} />
                <Tooltip
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}
                />
                <Area
                    type="monotone"
                    dataKey={lineKey}
                    stroke={color}
                    fill={color}
                    strokeWidth={2}
                    fillOpacity={0.8}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default SimpleChart;