import { useState } from "react";
import { useGetReservas } from "../hooks";

const filtroinicial = {
  restaurante: undefined,
  fecha: undefined,
  cliente: undefined,
};
export default function ListarReservas() {
  const [filtro, setFiltro] = useState(filtroinicial);

  const reservas = useGetReservas(filtro);
  if (!reservas) return <p>Cargando...</p>;
  if (reservas.length === 0)
    return (
      <>
        <Filtros onChange={(filtro) => setFiltro(filtro)} />
        <p>No hay reservas</p>
      </>
    );
  console.log(reservas);
  return (
    <>
    <h2>Listar reservas</h2>
      <Filtros onChange={(filtro) => setFiltro(filtro)} />
      <table style={{marginTop:16}}>
        <tr>
          <th>ID</th>
          <th>Fecha</th>
          <th>Hora Inicial</th>
          <th>Hora Final</th>
          <th>Cantidad Solicitada</th>
          <th>ID Mesa</th>
          <th>ID Restaurante</th>
          <th>ID Cliente</th>
          <th>Creado en</th>
          <th>Actualizado en</th>
        </tr>
        {reservas.map((reserva, index) => (
          <tr key={index}>
            {Object.entries(reserva).map(([key, value]) => (
              <td key={key}>{value}</td>
            ))}
          </tr>
        ))}
      </table>
    </>

    // <h1>Listar reservas</h1>
  );
}

const Filtros = ({ onChange }) => {
  const [selected, setSelected] = useState("todo");
  const [value, setValue] = useState("");

  const handleClick = () => {
    onChange({
      [selected]: value,
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <select
        style={{ marginRight: "10px" }}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="todo">Todos</option>
        <option value="restaurante">Restaurante</option>
        <option value="fecha">Fecha</option>
        <option value="cliente">Cliente</option>
      </select>
      <input
        type="text"
        style={{ marginRight: "10px" }}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleClick}>Buscar</button>
    </div>
  );
};
