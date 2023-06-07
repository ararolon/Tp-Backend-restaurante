import { useEffect, useState } from "react";
import { getRestaurantes } from "../api";
import GuardarReserva from "../components/GuardarReserva";
import useFetch from "../hooks/useFetch";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const fetchMesas = async (restaurante) => {
  const response = await axios.get(`http://localhost:9090/api/mesa/${restaurante}`);
  return response.data;
};

const fetchRestaurantes = async () => {
  const response = await axios.get(`http://localhost:9090/api/restaurante`);
  return response.data;
};

export default function Consumo() {
  
  const [restaurante, setRestaurante] = useState();

  const {data: restaurantes} = useQuery(['restaurantes'], fetchRestaurantes);

  const {data: mesas} = useQuery(['mesas', restaurante], () => fetchMesas(restaurante), {
   // enabled: !!restaurante,
  });

 console.log (restaurante);
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
      <select onChange={(e) => setRestaurante(e.target.value)}>
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
    </div>
  );
}
