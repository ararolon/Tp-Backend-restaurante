export function getRestaurantes() {
  return fetch("http://localhost:9090/api/restaurante")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

export async function getRestauratesOcupados(
  fecha,
  horaInicial,
  horaFinal,
  idRestaurante
) {
  try {
    const date = fecha;
    const params =
      idRestaurante + "/" + date + "/" + horaInicial + "/" + horaFinal;
    const res = await fetch(
      "http://localhost:9000/api/reserva/mesas/" + params
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function getMesas() {
  const res = await fetch("http://localhost:9090/api/mesa");
  const data = await res.json();
  return data;
}

export async function getMesasByRestaurante(idRestaurante) {
  const res = await fetch(
    "http://localhost:9090/api/mesa/restaurantes/" + idRestaurante
  );
  const data = await res.json();
  return data;
}

// export const getMesasDisponibles = async (
//   fecha,
//   horaInicial,
//   horaFinal,
//   idRestaurante
// ) => {
//   const mesas_ocupadas = await getRestauratesOcupados(
//     fecha,
//     horaInicial,
//     horaFinal,
//     idRestaurante
//   );
//   const mesas = await getMesas();
//   const mesas_disponibles = [];
//   //console.log(mesas)
//   //console.log(mesas_ocupadas)
//   mesas.forEach((element) => {
//     var mesa = mesas_ocupadas.find((valor) => {
//       //console.log("1-",valor.id_mesa)
//       //console.log("2-",element.id)
//       return valor.id_mesa == element.id;
//     });
//     //console.log(mesa)
//     if (!mesa) {
//       mesas_disponibles.push(element);
//     }
//   });
//   //console.log("Estas son todas las mesas disponibles",mesas_disponibles)
//   return mesas_disponibles;
// };


export async function getMesasDisponibles(
  fecha,
  horaInicial,
  horaFinal,
  idRestaurante
) {
  try {
    const date = fecha;
    const params =
      idRestaurante + "/" + date + "/" + horaInicial + "/" + horaFinal;
    const res = await fetch(
      "http://localhost:9090/api/reserva/mesas-disponibles/" + params
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}

export async function getClienteByCedula(cedula) {
  try {
    const res = await fetch(
      "http://localhost:9090/api/cliente/cedula/" + cedula
    );
    if (res.status === 404) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

// postCliente
export async function postCliente(cliente) {
  try {
    const res = await fetch("http://localhost:9090/api/cliente", {
      method: "POST",
      body: JSON.stringify(cliente),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

// postReserva
export async function postReserva(reserva) {
  try {
    const res = await fetch("http://localhost:9090/api/reserva", {
      method: "POST",
      body: JSON.stringify(reserva),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}

// getReservasByRestaurante
export async function getReservasByRestaurante(idRestaurante) {
  try {
    const res = await fetch(
      "http://localhost:9090/api/reserva/restaurante/" + idRestaurante
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}

// getReservas
export async function getReservas({restaurante, fecha, cliente}) {
  try {
    console.log(restaurante)
    if (restaurante){
      const res = await fetch(
        "http://localhost:9090/api/reserva/restaurante/" + restaurante
      );
      const data = await res.json();
      return data;
    }
    if (fecha){
      const res = await fetch(
        "http://localhost:9090/api/reserva/fecha/" + fecha
      );
      const data = await res.json();
      return data;
    }
    if (cliente){
      const res = await fetch(
        "http://localhost:9090/api/reserva/cliente/" + cliente
      );
      const data = await res.json();
      return data;
    }
    const res = await fetch(
      "http://localhost:9090/api/reserva"
    );
    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}