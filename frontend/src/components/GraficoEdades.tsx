import { 
    BarChart, 
    Bar, 
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
export default function GraficoEdades({ data }: Props) { 
    return ( <div style={{ marginBottom: '40px' }}> <h2>Ventas por Rango de Edad</h2> 
    <ResponsiveContainer width="100%" height={300}> 
        <BarChart data={data}> 
            <CartesianGrid strokeDasharray="3 3" /> 
            <XAxis dataKey="rango" stroke="#ffffff" /> <YAxis  stroke="#ffffff" tickFormatter={formatearNumero}/> <Tooltip
              formatter={(value) => Number(value).toLocaleString()}
            />
            <Bar dataKey="cantidad" /> 
            </BarChart> 
            </ResponsiveContainer> </div> ); }