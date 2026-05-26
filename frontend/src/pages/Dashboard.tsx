import { useEffect, useState } from 'react'; 
import { api } from '../services/api'; 
import DashboardCards from '../components/DashboardCards';
import GraficoCategorias from '../components/GraficoCategorias.tsx'; 
import GraficoCiudades from '../components/GraficoCiudades.tsx'; 
import GraficoFechas from '../components/GraficoFechas.tsx'; 
import GraficoMetodos from '../components/GraficoMetodos.tsx'; 
import GraficoEdades from '../components/GraficoEdades.tsx';
import GraficoProductos from '../components/GraficoProductos.tsx';

export default function Dashboard() { 
    const [dashboard, setDashboard] = useState<any>(null);
    const [categorias, setCategorias] = useState<any[]>([]); 
    const [ciudades, setCiudades] = useState<any[]>([]); 
    const [fechas, setFechas] = useState<any[]>([]); 
    const [metodos, setMetodos] = useState<any[]>([]);
    const [productos, setProductos] = useState<any[]>([]);
    const [edades, setEdades] = useState<any[]>([]);

    // 1. ESTADO GLOBAL DE LOS FILTROS
    const [filtros, setFiltros] = useState({
        categoria: '',
        ciudad: '',
        metodopago: ''
    });

    // 2. ACTUALIZAR PETICIONES CON LOS PARÁMETROS
    async function cargarDatos() { 
        try { 
            // Axios convierte este objeto en Query Params automáticamente
            const config = { params: filtros };

            const [
                dashboardRes, categoriasRes, ciudadesRes, fechasRes, 
                metodosRes, productosRes, edadesRes
            ] = await Promise.all([
                api.get('/analiticas/dashboard', config), 
                api.get('/analiticas/ventas-por-categoria', config), 
                api.get('/analiticas/compras-por-ciudad', config), 
                api.get('/analiticas/ventas-por-fecha', config), 
                api.get('/analiticas/metodos-pago', config), 
                api.get('/analiticas/productos-mas-vendidos', config),
                api.get('/analiticas/compras-por-rango-etario', config),
            ]);
            
            setDashboard(dashboardRes.data); 
            
            // Nota: Si limpiaste el JSON en el backend como te sugerí antes, 
            // quizás solo necesites usar `.data` en vez de `.data.data`
            setCategorias(categoriasRes.data.data || categoriasRes.data); 
            setCiudades(ciudadesRes.data.data || ciudadesRes.data); 
            setFechas(fechasRes.data.data || fechasRes.data); 
            setMetodos(metodosRes.data.data || metodosRes.data); 
            setProductos(productosRes.data.data || productosRes.data);
            setEdades(edadesRes.data.data || edadesRes.data); 
        } 
        catch (error) { 
            console.error(error);
        } 
    } 

    // 3. REACTIVIDAD: Volver a cargar si los filtros cambian
    useEffect(() => { 
        cargarDatos(); 
    }, [filtros]); 

    // 4. MANEJADOR DE EVENTOS PARA LOS SELECTS
    const handleFiltroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        });
    };

    if (!dashboard) { 
        return <div style={{ padding: '50px', textAlign: 'center' }}>Cargando analíticas...</div>;
    } 
    
    return (
        <div style={{ padding: '50px' }}> 
            <h1>Dashboard Analítico</h1> 

            {/* 5. BARRA DE FILTROS EN LA INTERFAZ */}
            <div style={filtrosStyle}>
                <select name="categoria" value={filtros.categoria} onChange={handleFiltroChange} style={selectStyle}>
                    <option value="">Todas las Categorías</option>
                    <option value="Juguetes">Juguetes</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Comida">Comida</option>
                    <option value="Ropa">Ropa</option>
                    <option value="Tecnologia">Tecnología</option>
                </select>

                <select name="ciudad" value={filtros.ciudad} onChange={handleFiltroChange} style={selectStyle}>
                    <option value="">Todas las Ciudades</option>
                    {/* Reemplaza con ciudades reales de tu CSV si son distintas */}
                    <option value="Santiago">Santiago</option>
                    <option value="Valparaiso">Valparaíso</option>
                    <option value="Concepcion">Concepción</option>
                    <option value="La Serena">La Serena</option>
                    <option value="Coquimbo">Coquimbo</option>
                </select>

                <select name="metodopago" value={filtros.metodopago} onChange={handleFiltroChange} style={selectStyle}>
                    <option value="">Todos los Métodos</option>
                    <option value="Debito">Débito</option>
                    <option value="Credito">Crédito</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia">Transferencia</option>
                </select>
            </div>

            <DashboardCards dashboard={dashboard} /> 
            <GraficoCategorias data={categorias} /> 
            <GraficoCiudades data={ciudades} /> 
            <GraficoFechas data={fechas} /> 
            <GraficoMetodos data={metodos} /> 
            <GraficoProductos data={productos} />
            <GraficoEdades data={edades} /> 
        </div>
    ); 
}

// Estilos usando las variables CSS que ya tienes en index.css
const filtrosStyle = {
    display: 'flex',
    gap: '15px',
    marginBottom: '30px',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'var(--social-bg)',
    borderRadius: '10px',
    border: '1px solid var(--border)'
};

const selectStyle = {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--bg)',
    color: 'var(--text-h)',
    fontSize: '16px',
    minWidth: '200px',
    cursor: 'pointer',
    outline: 'none'
};