import { useEffect, useState } from 'react'; 
import { api } from '../services/api'; 
import DashboardCards from '../components/DashboardCards'; 
import GraficoCategorias from '../components/GraficoCategorias.tsx'; 
import GraficoCiudades from '../components/GraficoCiudades.tsx'; 
import GraficoFechas from '../components/GraficoFechas.tsx'; 
import GraficoMetodos from '../components/GraficoMetodos.tsx'; 
import GraficoEdades from '../components/GraficoEdades.tsx'; 

export default function Dashboard() { 
    const [dashboard, setDashboard] = useState<any>(null); 
    const [categorias, setCategorias] = useState<any[]>([]); 
    const [ciudades, setCiudades] = useState<any[]>([]); 
    const [fechas, setFechas] = useState<any[]>([]); 
    const [metodos, setMetodos] = useState<any[]>([]); 
    const [edades, setEdades] = useState<any[]>([]); 

    async function cargarDatos() { 
        try { 
            const [dashboardRes, categoriasRes, ciudadesRes, fechasRes, metodosRes, edadesRes,] = await Promise.all([
                api.get('/analiticas/dashboard'), 
                api.get('/analiticas/ventas-por-categoria'), 
                api.get('/analiticas/compras-por-ciudad'), 
                api.get('/analiticas/ventas-por-fecha'), 
                api.get('/analiticas/metodos-pago'), 
                api.get('/analiticas/compras-por-rango-etario'

                ),]); setDashboard(dashboardRes.data); 
                setCategorias(categoriasRes.data.data); 
                setCiudades(ciudadesRes.data.data); 
                setFechas(fechasRes.data.data); 
                setMetodos(metodosRes.data.data); 
                setEdades(edadesRes.data.data); } 
                catch (error) { 
                    console.error(error); 
                } } useEffect(() => { cargarDatos(); }, []); 
                if (!dashboard) { 
                    return <div>Cargando...</div>; 
                } return (
                <div style={{ padding: '40px' }}> 
                <h1>Dashboard Analítico</h1> 
                <DashboardCards dashboard={dashboard} /> 
                <GraficoCategorias data={categorias} /> 
                <GraficoCiudades data={ciudades} /> 
                <GraficoFechas data={fechas} /> 
                <GraficoMetodos data={metodos} /> 
                <GraficoEdades data={edades} /> </div>
                ); }