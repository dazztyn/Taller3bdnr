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
    return `${(num / 1000000).toFixed(3)}M`;
  }

  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }

  return num.toString();
}
function calcularDomain(data: any[]) { const valores = data.map((d) => Number(d.cantidad)); const min = Math.min(...valores); const max = Math.max(...valores); return [ Math.floor(min * 0.995), Math.ceil(max * 1.005), ]; }
interface Props { data: any[]; } 
export default function GraficoCiudades({ data }: Props) { 
    return ( <div style={{ marginBottom: '40px' }}> <h2>Ventas por Ciudad</h2> 
    <ResponsiveContainer width="100%" height={300}> 
        <BarChart data={data} margin={{ left: 10 }}> 
            <CartesianGrid strokeDasharray="3 3" /> 
            <XAxis dataKey="ciudad" stroke="#ffffff" /> <YAxis domain={calcularDomain(data)} stroke="#ffffff" tickFormatter={formatearNumero}/> <Tooltip
              formatter={(value) => Number(value).toLocaleString()}
            />
            <Bar dataKey="cantidad" fill="#e21111" /> 
            </BarChart> 
            </ResponsiveContainer> </div> ); }