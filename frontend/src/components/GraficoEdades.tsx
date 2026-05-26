import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer, 
} from 'recharts'; 
const COLORS = [ 
  '#3b82f6', 
  '#22c55e', 
  '#ef4444', 
  '#f59e0b', 
  '#8b5cf6', 
]; export default function GraficoEdades({ data }: any) { 
  return ( <div style={{ 
    marginBottom: '40px' }}> 
    <h2>Compras por Rango Etario</h2> 
    <ResponsiveContainer width="100%" height={400}> 
      <PieChart> 
        <Pie data={data} dataKey="cantidad" nameKey="rango" outerRadius={140} label={({ rango, percent }) => `${rango} (${(percent * 100).toFixed(1)}%)` } > 
          {data.map((_: any, index: number) => ( 
            <Cell key={index} 
          fill={COLORS[index % COLORS.length]} /> ))} </Pie> 
          <Tooltip formatter={(value, _, props) => { const total = data.reduce( (acc, item) => acc + Number(item.cantidad), 0 ); const porcentaje = (Number(value) / total) * 100; return [ `${Number(value).toLocaleString()} (${porcentaje.toFixed(1)}%)`, props.payload.rango, ]; }} />
          </PieChart> 
          </ResponsiveContainer> </div> ); }