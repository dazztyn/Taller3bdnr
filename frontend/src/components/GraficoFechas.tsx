import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid, 
    ResponsiveContainer, 
} from 'recharts'; 
function formatearNumero(valor: string | number) {
  const num = Number(valor);

  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return num.toString();
}
interface Props { data: any[]; } 
export default function GraficoFechas({ data }: any) { 
    return ( <div style={{ marginBottom: '40px' }}> 
    <h2>Ventas por Fecha</h2> 
    <ResponsiveContainer width="100%" height={300}> 
        <LineChart data={data}> 
            <CartesianGrid strokeDasharray="3 3" /> 
            <XAxis dataKey="fecha" tickFormatter={(fecha) => fecha.slice(5)} /> 
                <YAxis domain={[6500, 'auto']} tickFormatter={formatearNumero} /> 
                <Tooltip /> <Line type="monotone" dataKey="cantidad" stroke="#8b5cf6" /> </LineChart> </ResponsiveContainer> </div> ); }