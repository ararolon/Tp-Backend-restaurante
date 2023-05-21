import { useGetMesasDisponibles } from "../hooks";


export default function MesasDisponibles({ idRestaurante, fecha, horaInicial, horaFinal, onChange }) {


  const mesasDisponibles = useGetMesasDisponibles(
    fecha,
    horaInicial,
    horaFinal,
    idRestaurante
  );
  return (
    <div>
      <h2>Mesas disponibles</h2>
      <div className="radio-select">
        {mesasDisponibles?.length > 0 &&
          mesasDisponibles.map((mesa) => (
            <div key={mesa.id}>
              <input
                type="radio"
                id={mesa.id}
                name="mesa"
                value="email"
                onChange={()=>onChange(mesa.id, mesa.capacidad)}
              />
              <label htmlFor={mesa.id}>
                {mesa.nombre} - capacidad {mesa.capacidad}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
}
