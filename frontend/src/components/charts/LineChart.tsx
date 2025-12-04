import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export default function BasicLineChart({ data }: { data: any[] }) {
return (
<ResponsiveContainer width="100%" height={300}>
<LineChart data={data}>
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
</LineChart>
</ResponsiveContainer>
);
}