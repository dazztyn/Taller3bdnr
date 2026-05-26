interface Props { 
    dashboard: any; 
} 
export default function DashboardCards({ dashboard }: Props) { 
    return ( 
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px', }} > 
    <div style={cardStyle}> <h3>Total Ventas</h3> <p>{dashboard.totalVentas}</p> </div> 
    <div style={cardStyle}> <h3>Promedio Gasto</h3> <p>${dashboard.promedioGasto}</p> </div> 
    <div style={cardStyle}> <h3>Categoría Top</h3> <p>{dashboard.categoriaMasVendida}</p> </div> </div> ); 
    } const cardStyle = { border: '1px solid #ccc', padding: '20px', borderRadius: '10px', };