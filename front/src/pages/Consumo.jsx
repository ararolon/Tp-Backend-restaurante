import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ConsumoAbierto } from "../components/ConsumoAbierto";

const fetchMesas = async (restaurante) => {
  const response = await axios.get(
    `http://localhost:9090/api/mesa/restaurantes/${restaurante}`
  );
  return response.data;
};

const fetchRestaurantes = async () => {
  const response = await axios.get(`http://localhost:9090/api/restaurante`);
  return response.data;
};

const fetchMesaOcupada = async (mesa) => {
  const response = await axios.get(
    `http://localhost:9090/api/consumo/estaOcupada/${mesa}`
  );
  return response.data;
};

export default function Consumo() {
  const [restaurante, setRestaurante] = useState();

  const [mesa, setMesa] = useState();

  const { data: restaurantes } = useQuery({
    queryKey: ["restaurantes"],
    queryFn: fetchRestaurantes,
  });

  const { data: mesas } = useQuery({
    queryKey: ["mesas", restaurante],
    queryFn: () => fetchMesas(restaurante),
    enabled: !!restaurante,
  });

  const { data: consumo } = useQuery({
    queryKey: ["consumo", mesa?.id],
    queryFn: () => fetchMesaOcupada(mesa?.id),
    enabled: !!mesa,
  });

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
      <select
        onChange={(e) =>
          setMesa(mesas.find((mesa) => mesa.id === e.target.value))
        }
      >
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
        <ConsumoAbierto
          mesa={mesa}
          consumo={consumo}
          estaAbierto={consumo == ""}
        />
      {/* {consumo?.estado == "abierto" ? (
      ) : (
        <h2>Mesa no está ocupada</h2>
      )} */}
    </div>
  );
}
