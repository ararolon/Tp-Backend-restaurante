import { useEffect, useState } from "react";
import { getRestaurantes } from "../api";
import GuardarReserva, { BuscarCliente } from "../components/GuardarReserva";
import useFetch from "../hooks/useFetch";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchMesas = async (restaurante) => {
  const response = await axios.get(`http://localhost:9090/api/mesa/restaurantes/${restaurante}`);
  return response.data;
};

const fetchRestaurantes = async () => {
  const response = await axios.get(`http://localhost:9090/api/restaurante`);
  return response.data;
};

const fetchMesaOcupada = async (mesa) => {
  const response = await axios.get(`http://localhost:9090/api/consumo/estaOcupada/${mesa}`);
  return response.data;
};

const fetchDetalleConsumo = async (mesa) => { 
  const response = await axios.get(`http://localhost:9090/api/consumo/detalle/${mesa}`);
  return response.data;
};

const fetchClientes = async () => {
  const response = await axios.get(`http://localhost:9090/api/cliente`);
  return response.data;
};

const fetchProductos = async () => {
  const response = await axios.get(`http://localhost:9090/api/producto`);
  return response.data;
};

export default function Consumo() {
  
    const [restaurante, setRestaurante] = useState();

    const [mesa, setMesa] = useState();

    const { data: restaurantes } = useQuery({
      queryKey: ['restaurantes'],
      queryFn: fetchRestaurantes
    })
  
    const { data: mesas } = useQuery({
      queryKey: ['mesas', restaurante],
      queryFn: () => fetchMesas(restaurante),
      enabled: !!restaurante,
    })

    const { data: consumo } = useQuery({
      queryKey: ['consumo', mesa?.id],
      queryFn: () => fetchMesaOcupada(mesa?.id),
      enabled: !!mesa,
    })

    const { data: detalleConsumo } = useQuery({
      queryKey: ['detalleConsumo', consumo?.id],
      queryFn: () => fetchDetalleConsumo(consumo?.id),
      enabled: !!consumo,
    })
    
    const { data: clientes } = useQuery({
      queryKey: ['clientes'],
      queryFn: () => fetchClientes()
    })

    const { data: productos } = useQuery({
      queryKey: ['productos'],
      queryFn: () => fetchProductos()
    })

    console.log({consumo})
    console.log({detalleConsumo})
    console.log({mesa})

  return (
    <div className="formulario">
      <h1>Consumo</h1>
      <h2>Seleccionar Restaurante</h2>
      <select onChange={(e) => setRestaurante(e.target.value)}>
        <option>---</option>
        {restaurantes?.length > 0 &&
          restaurantes.map((restaurante) => {
            return (
              <option key={restaurante.id} value={restaurante.id}>
                {restaurante.nombre}
              </option>
            );
          })}
          
      </select>
      <h2>Seleccionar Mesa</h2>
      <select onChange={(e) => setMesa(mesas.find((mesa) => mesa.id === e.target.value))}>
        <option>---</option>
        {mesas?.length > 0 &&
          mesas.map((mesa) => {
            return (
              <option key={mesa.id} value={mesa.id}>
                {mesa.nombre}
              </option>
            );
          })}
          
      </select>
      {consumo?.estado == "abierto" ? (
        <>
          <h4>Mesa Ocupada</h4>
          <h2>Consumo actual</h2>
          <ul>
            {
              detalleConsumo?.map((detalle) => {
                return (
                  <p key={detalle.id}>
                    {detalle.cantidad} - {(productos.find(producto=>producto.id == detalle.id_producto)).nombre}
                  </p>
                );
              })
            }
          
          </ul>
          <h2>Consumo total</h2>
          <p>{consumo.total}</p>
          <h2>Cliente</h2>
          <h3>Ingrese cedula para cambiar el cliente </h3>
          <p>{(clientes.find(cliente=>cliente.id == consumo.id_cliente)).nombre}</p>
          <BuscarCliente
          onChange={(cliente) => {
            console.log (cliente)
            console.log ('mimir')
            //setReserva({ ...reserva, id_cliente: cliente.id });
          }}
        />
        </>
      ) : (
        <h2>Mesa Disponible</h2>
      )}  
    </div>
  );
}
