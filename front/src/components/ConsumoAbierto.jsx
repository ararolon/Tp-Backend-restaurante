import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { BuscarCliente } from "./GuardarReserva";
import { PDFViewer } from "@react-pdf/renderer";
import { Ticketpdf } from "../pages/Ticketpdf";

export const ConsumoAbierto = ({ consumo, mesa, estaAbierto }) => {
  const [cliente, setCliente] = useState();
  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();
  // setMostrarpdf
  const [mostrarpdf, setMostrarpdf] = useState(false);

  useEffect(() => {
    setCliente(undefined);
    setProducto(undefined);
    setCantidad(undefined);
  }, [mesa]);

  const { data: detalleConsumo } = useQuery({
    queryKey: ["detalleConsumo", consumo?.id],
    queryFn: () => fetchDetalleConsumo(consumo?.id),
    enabled: !!consumo,
  });

  const { data: clientes, isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: () => fetchClientes(),
  });

  const { data: productos } = useQuery({
    queryKey: ["productos"],
    queryFn: () => fetchProductos(),
  });

  //usemutation
  const queryClient = useQueryClient();
  const { mutate: editarConsumo } = useMutation({
    mutationFn: editarConsumoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries("consumo");
    },
    enabled: !!consumo,
  });

  const { mutate: agregarDetalle } = useMutation({
    mutationFn: agregarDetalleAPI,
    onSuccess: () => {
      queryClient.invalidateQueries("consumo");
    },
    enabled: !!consumo,
  });

  const { mutate: crearConsumo } = useMutation({
    mutationFn: crearConsumoAPI,
    onSuccess: () => {
      queryClient.invalidateQueries("consumo");
    },
    enabled: !!consumo,
  });

  //   cerrarMesaAPI
  const { mutate: cerrarMesa } = useMutation({
    mutationFn: () => cerrarMesaAPI(consumo?.id),
    onSuccess: () => {
      queryClient.invalidateQueries("consumo");
    },
    enabled: !!consumo,
  });

  if (isLoading) return <p>Cargando...</p>;

  return (
    <>
      <h4>{estaAbierto ? "Mesa no ocupada" : "Mesa Ocupada"}</h4>
      <h2>Cliente</h2>
      <h3>Ingrese cedula para cambiar el cliente </h3>
      <p>
        {clientes.find((cliente) => cliente.id == consumo?.id_cliente)?.nombre}
      </p>
      <BuscarCliente
        clienteCreado={(cliente) => {
          setCliente(cliente);
        }}
        onChange={(cliente) => {
          console.log("cambio cliente", cliente);
          setCliente(cliente);
        }}
      />
      <button
        onClick={() => {
          console.log("editando consumo", estaAbierto);
          if (!estaAbierto) {
            editarConsumo({ id: consumo?.id, id_cliente: cliente.id });
          } else {
            console.log("creando consumo");
            console.log("cliente", cliente);
            if (!cliente) {
              alert("Ingrese cliente");
              return;
            }
            if (!mesa) {
              alert("Ingrese mesa");
              return;
            }
            crearConsumo({
              id_mesa: mesa.id,
              id_cliente: cliente.id,
            });
          }
        }}
      >
        {estaAbierto ? "Agregar Cliente" : "Cambiar Cliente"}
      </button>
      {!estaAbierto && (
        <>
          <h2>Consumo actual</h2>
          <h2>Detalle</h2>
          <div className="detalle">
            <input
              type="number"
              placeholder="Cantidad"
              onChange={(e) => setCantidad(e.target.value)}
              style={{ width: "30px", height: "40px" }}
            />
            <select
              onChange={(e) =>
                setProducto(
                  productos.find((producto) => producto.id === e.target.value)
                )
              }
              style={{ height: "40px" }}
            >
              <option>---</option>
              {productos?.length > 0 &&
                productos.map((producto) => {
                  return (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  );
                })}
            </select>
          </div>
          <button
            onClick={() => {
              if (!producto || !cantidad) {
                alert("Ingrese producto y cantidad");
                return;
              }
              console.log("estaAbierto", estaAbierto);
              agregarDetalle({
                id_consumo: consumo?.id,
                id_producto: producto.id,
                cantidad: cantidad,
              });

              //   if (consumo)
            }}
          >
            Agregar detalle
          </button>
          {(!detalleConsumo || detalleConsumo?.length == 0) && (
            <p>no hay detalle</p>
          )}
          <ul>
            {detalleConsumo?.map((detalle) => {
              return (
                <p key={detalle.id}>
                  {detalle.cantidad} -{" "}
                  {
                    productos.find(
                      (producto) => producto.id == detalle.id_producto
                    ).nombre
                  }
                </p>
              );
            })}
          </ul>
          <h2>Consumo total</h2>
          <p>{consumo?.total}</p>
        </>
      )}
      <button
        onClick={() => {
          cerrarMesa(undefined, {
            onSuccess: () => {
              setCantidad(undefined);
              setCliente(undefined);
              setProducto(undefined);
                setMostrarpdf(true);
            },
          });
        }}
      >
        Cerrar mesa
      </button>
      {mostrarpdf && (
        <PDFViewer style={{visibilty:"invisible"}}>
          <Ticketpdf consumo={consumo} detalles={detalleConsumo} clientes={clientes} productos={productos}/>
        </PDFViewer>
      )}
    </>
  );
};

const fetchDetalleConsumo = async (mesa) => {
  const response = await axios.get(
    `http://localhost:9090/api/consumo/detalle/${mesa}`
  );
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

const editarConsumoAPI = async (consumo) => {
  if (consumo?.id === undefined) return;
  if (consumo?.id_cliente === undefined) return;
  const response = await axios.put(
    `http://localhost:9090/api/consumo`,
    consumo
  );
  return response.data;
};

const agregarDetalleAPI = async (data) => {
  const response = await axios.post(
    `http://localhost:9090/api/consumo/addDetalle`,
    data
  );
  return response.data;
};

// http://localhost:9090/api/consumo
const crearConsumoAPI = async (data) => {
  const response = await axios.post(`http://localhost:9090/api/consumo`, data);
  return response.data;
};

// http://localhost:9090/api/consumo/cerrarMesa/11
const cerrarMesaAPI = async (id) => {
  if (id === undefined) return;
  const response = await axios.put(
    `http://localhost:9090/api/consumo/cerrarMesa/${id}`
  );
  return response.data;
};
