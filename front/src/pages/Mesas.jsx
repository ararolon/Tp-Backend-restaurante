import { useState } from "react";
import { useGetMesasByRestaurante, useGetRestaurantes } from "../hooks";
import { GraficarMesas } from "../components/GraficarMesas";

export function Mesas() {
  const [restaurante, setRestaurante] = useState(0);
  const [planta, setPlanta] = useState(1);
  const mesas = useGetMesasByRestaurante(restaurante);
  const restaurantes = useGetRestaurantes();

  return (
    <div className="mesas">
      <div className="filtros">
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
        <select onChange={(e) => setPlanta(e.target.value)}>
          <option value="1">Planta 1</option>
          <option value="2">Planta 2</option>
          <option value="3">Planta 3</option>
        </select>
      </div>

      <GraficarMesas mesas={mesas.filter((mesa) => mesa.planta == planta)} />
    </div>
  );
}
