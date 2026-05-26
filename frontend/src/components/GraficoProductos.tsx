import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid, 
    ResponsiveContainer, 
} from 'recharts'; 
interface Props { data: any[]; } 
function calcularDomain(data: any[]) { const valores = data.map((d) => Number(d.cantidad)); const min = Math.min(...valores); const max = Math.max(...valores); return [ Math.floor(min * 0.995), Math.ceil(max * 1.005), ]; }
function formatearNumero(valor: string | number): 
string { 
    const num = Number(valor); 
    if (num >= 1000000) { 
        return `${(num / 1000000).toFixed(1)}M`; 
    } 
    if (num >= 1000) { 
        return `${(num / 1000).toFixed(1)}K`; 
    } 
    return num.toString(); } 
    export default function GraficoProductos({ data }: Props) { 
        return ( 
        <div style={{ marginBottom: '40px' }}> 
        <h2>Top 10 Productos Más Vendidos</h2> 
        <ResponsiveContainer width="100%" height={500} > 
            <BarChart layout="vertical" data={data} margin={{ left: 10 }} > 
                <CartesianGrid strokeDasharray="3 3" /> <XAxis type="number"  stroke="#ffffff" domain={calcularDomain(data)} tickFormatter={formatearNumero} /> 
                <YAxis type="category" stroke="#ffffff" dataKey="producto" width={150} /> 
                <Tooltip formatter={(value) => Number(value).toLocaleString() } /> 
                    <Bar dataKey="cantidad" fill="#de8219" /> 
                    </BarChart> 
                    </ResponsiveContainer> 
                    </div> ); }