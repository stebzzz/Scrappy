import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

interface ChartProps {
  data: any[];
  type: 'bar' | 'line' | 'pie';
  title?: string;
  colors?: string[];
  height?: number;
  dataKey?: string;
  nameKey?: string;
}

export const AnalyticsChart: React.FC<ChartProps> = ({
  data,
  type,
  title,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'],
  height = 300,
  dataKey = 'value',
  nameKey = 'name'
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      {title && <h3 className="text-lg font-medium text-white mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={nameKey} stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#F9FAFB' }} 
              itemStyle={{ color: '#F9FAFB' }}
            />
            <Legend />
            <Bar dataKey={dataKey} fill={colors[0]} />
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey={nameKey} stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#F9FAFB' }} 
              itemStyle={{ color: '#F9FAFB' }}
            />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke={colors[0]} activeDot={{ r: 8 }} />
          </LineChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={(entry) => entry[nameKey]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#1F2937', borderColor: '#4B5563', color: '#F9FAFB' }} 
              itemStyle={{ color: '#F9FAFB' }}
            />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}; 