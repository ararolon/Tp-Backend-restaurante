import { useState } from "react";
import MesasDisponibles from "./MesasDisponibles";
import RegistarCliente from "./RegistrarCliente";
import { getClienteByCedula, postReserva } from "../api";

export default function GuardarReserva({
  idRestaurante,
  fecha,
  horaInicial,
  horaFinal,
}) {
  const [reserva, setReserva] = useState({
    id_restaurante: idRestaurante,
    fecha,
    hora_inicial: horaInicial,
    hora_final: horaFinal,
  });

  const handleClick = async () => {
    if (reserva.id_cliente === undefined) {
      alert("Seleccione un cliente");
      return;
    }
    if (reserva.id_mesa === undefined) {
      alert("Seleccione una mesa");
      return;
    }
    await postReserva(reserva);
    alert ("Reserva guardada");
    window.location.reload();
  }

  return (
    <>
      <div className="co">
        <MesasDisponibles
          idRestaurante={idRestaurante}
          fecha={fecha}
          horaInicial={horaInicial}
          horaFinal={horaFinal}
          onChange={(mesaId, capacidad) => {
            setReserva({ ...reserva, id_mesa: mesaId, cantidad_solicitada:capacidad });
          }}
        />
        <p>Ingrese su cedula para guardar la reserva</p>
        <BuscarCliente
          onChange={(cliente) => {
            setReserva({ ...reserva, id_cliente: cliente.id });
          }}
        />
      </div>
      <button onClick={handleClick}>Guardar Reserva</button>
    </>
  );
}

const BuscarCliente = ({ onChange }) => {
  const [cliente, setCliente] = useState("");
  const [clienteEncontrado, setClienteEncontrado] = useState(undefined);
  //   const cliente = useGetClienteByCedula(cedula);

  const handleClick = async () => {
    if (cliente.cedula === "" || cliente.cedula === undefined) {
      alert("Ingrese una cedula");
      return;
    }
    const clienteApi = await getClienteByCedula(cliente.cedula);
    if (clienteApi !== null) {
      setClienteEncontrado(true);
      setCliente(clienteApi);
      onChange(clienteApi);
    } else {
      onChange({ id_cliente: null });
      setClienteEncontrado(false);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="cedula"
          onChange={(e) => {
            setCliente({ ...cliente, cedula: e.target.value });
          }}
        />
        <button onClick={handleClick}>Buscar cliente</button>
      </div>
      {clienteEncontrado == false && (
        <RegistarCliente
          cedula={cliente.cedula}
          onChange={() => {
            handleClick();
          }}
        />
      )}
      {clienteEncontrado == true && (
        <div>
          <p style={{ margin: 0 }}>Cliente seleccionado/a</p>
          <p style={{ margin: 0 }}>Nombre: {cliente.nombre}</p>
          <p style={{ margin: 0 }}>Apellido: {cliente.apellido}</p>
        </div>
      )}
    </div>
  );
};
