import { Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function ComplexityPanel({ shiftData, p, q }) {
    // Prepare the data for the Recharts bar graph
    const chartData = [
        {
            name: 'Ring Network',
            steps: shiftData.ringSteps,
            color: '#ef4444' // Red
        },
        {
            name: '2D Mesh',
            steps: shiftData.meshSteps,
            color: '#3b82f6' // Blue
        }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            {/* Panel Header */}
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <Activity className="text-purple-600" size={24} />
                <h2 className="text-xl font-bold text-slate-800">Complexity Analysis</h2>
            </div>

            <div className="space-y-6">
                {/* Text Breakdown */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                        <div className="text-xs font-bold text-red-500 uppercase">Ring Steps</div>
                        <div className="text-2xl font-bold text-red-700">{shiftData.ringSteps}</div>
                        <div className="text-xs text-red-600 mt-1">min(q, p-q)</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <div className="text-xs font-bold text-blue-500 uppercase">Mesh Steps</div>
                        <div className="text-2xl font-bold text-blue-700">{shiftData.meshSteps}</div>
                        <div className="text-xs text-blue-600 mt-1">row_shift + col_shift</div>
                    </div>
                </div>

                {/* Visual Graph using Recharts */}
                <div className="h-48 w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
                            <YAxis tick={{ fontSize: 12, fill: '#475569' }} />
                            <Tooltip
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="steps" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Quick Summary text */}
                <p className="text-sm text-slate-600 text-center font-medium">
                    For p={p} and q={q}, the Mesh is {shiftData.meshSteps < shiftData.ringSteps ? 'more' : shiftData.meshSteps > shiftData.ringSteps ? 'less' : 'equally'} efficient.
                </p>
            </div>
        </div>
    );
}