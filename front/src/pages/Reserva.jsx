import { useEffect, useState } from "react";
import { getRestaurantes } from "../api";
import GuardarReserva from "../components/GuardarReserva";

const horasInicial = [
  { hora: "12:00 a 13:00", value: "12-13", isChecked: false },
  { hora: "13:00 a 14:00", value: "13-14", isChecked: false },
  { hora: "14:00 a 15:00", value: "14-15", isChecked: false },
  { hora: "19:00 a 20:00", value: "19-20", isChecked: false },
  { hora: "20:00 a 21:00", value: "20-21", isChecked: false },
  { hora: "21:00 a 22:00", value: "21-22", isChecked: false },
  { hora: "22:00 a 23:00", value: "22-23", isChecked: false },
];

export default function Reserva() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [horas, setHoras] = useState(horasInicial);
  const [restaurante, setRestaurante] = useState();
  const [mostraMesas, setMostrarMesas] = useState(false);

  const horasSeleccionadas = horas
    .filter((h) => h.isChecked)
    .map((h) => h.value);

  useEffect(() => {
    const getData = async () => {
      const datos = await getRestaurantes();
      setRestaurantes(datos);
    };
    getData();
  }, []);

  const verMesa = () => {
    if (restaurante && fecha && horas.some((h) => h.isChecked)) {
      setMostrarMesas(true);
    } else {
      alert("Debes seleccionar un restaurante, una fecha y al menos una hora");
      setMostrarMesas(false);
    }
  };

  return (
    <div className="formulario">
      <h1>Reserva</h1>
      <h2>Selecciona el restaurante</h2>
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
      <h2>Selecciona la fecha</h2>
      <div className="fecha-hora">
        <input
          type="date"
          id="start"
          name="trip-start"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          size="20"
        ></input>
      </div>

      <h2>Selecciona la hora</h2>
      <div
        className="hora-checkbox"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        {horas.map((hora) => (
          <label key={hora.value} style={{ textAlign: "start" }}>
            <input
              type="checkbox"
              checked={hora.isChecked}
              onChange={() => {
                console.log(horas);
                const newHoras = [...horas];
                const newHora = newHoras.find((h) => h.value === hora.value);
                newHora.isChecked = !newHora.isChecked;
                setHoras(newHoras);
              }}
            />
            {hora.hora}
          </label>
        ))}
      </div>

      <button onClick={verMesa}>Ver mesas disponibles</button>
      {JSON.stringify}
      {mostraMesas && horasSeleccionadas.length > 0 && (
        <GuardarReserva
          horaInicial={horasSeleccionadas[0].split("-")[0]}
          horaFinal={horasSeleccionadas[horasSeleccionadas.length - 1].split("-")[1]}
          idRestaurante={restaurante}
          fecha={fecha}
        />
      )}
      <div className="h" style={{ height: "400px" }}></div>
    </div>
  );
}
