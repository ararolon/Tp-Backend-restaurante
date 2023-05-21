import { useEffect, useState } from "react";
import { getClienteByCedula, getMesasByRestaurante, getMesasDisponibles, getReservas, getReservasByRestaurante, getRestaurantes } from "../api";

export const useGetMesasDisponibles = (
  fecha,
  horaInicial,
  horaFinal,
  idRestaurante
) => {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const getDatos = async () => {
      // if (datos)
      const mesas = await getMesasDisponibles(
        fecha,
        horaInicial,
        horaFinal,
        idRestaurante
      );
      console.log(mesas);
      setDatos(mesas);
    };
    getDatos();
  }, [fecha, horaFinal, horaInicial, idRestaurante]);
  return datos;
};

export const useGetClienteByCedula = (cedula) => {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const getDatos = async () => {
      // if (datos)
      const cliente = await getClienteByCedula(cedula);
      console.log(cliente);
      setDatos(cliente);
    };
    getDatos();
  }, [cedula]);
  return datos;
}

// getreservastodas
export const useGetReservas = (filtros) => {
  console.log(filtros);
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const getDatos = async () => {
      // if (datos)
      const reservas = await getReservas(filtros);

      setDatos(reservas.map((reserva) => ({
        ...reserva,
        fecha: (new Date(reserva.fecha)).toLocaleDateString(),
        createdAt: (new Date(reserva.createdAt)).toLocaleDateString(),
        updatedAt: (new Date(reserva.updatedAt)).toLocaleDateString(),
      })));

    };
    getDatos();
  }, [filtros]);
  return datos;
}

export const useGetReservasByRestaurante = (idRestaurante) => {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const getDatos = async () => {
      // if (datos)
      const reservas = await getReservasByRestaurante(idRestaurante);
      console.log(reservas);
      setDatos(reservas);
    };
    getDatos();
  }, [idRestaurante]);
  return datos;
}

export const useGetRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const datos = await getRestaurantes();
      setRestaurantes(datos);
    };
    getData();
  }, []);

  return restaurantes;
};

// getMesasByRestaurante
export const useGetMesasByRestaurante = (idRestaurante) => {
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const datos = await getMesasByRestaurante(idRestaurante);
      setMesas(datos);
    };
    getData();
  }, [idRestaurante]);

  return mesas;
}
