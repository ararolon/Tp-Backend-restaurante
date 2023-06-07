import { useState } from "react";
import "./App.css";
import Reserva from "./pages/Reserva";
import ListarReservas from "./pages/ListarReservas";
import { Mesas } from "./pages/Mesas";
import Consumo from "./pages/Consumo";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


function App() {
  const [pag, setpag] = useState(null);

  return (
    // <Mesas/>
    <QueryClientProvider client={queryClient}>
      {pag === null && (
        <>
          <h1>ReservaYA!</h1>
          <div style={{ display: "flex", gap: 16 }}>
            <button onClick={() => setpag("reserva")}>Crear reserva</button>
            <button onClick={() => setpag("listar")}>Listar reservas</button>
            <button onClick={() => setpag("mapa")}>Ver mapa de mesas</button>
            <button onClick={() => setpag("consumo")}>Administrar consumo</button>
          </div>
        </>
      )}
      {pag === "reserva" && <Reserva />}
      {pag === "listar" && <ListarReservas/>}
      {pag === "mapa" && <Mesas/>}
      {pag === "consumo" && <Consumo/>}

    </QueryClientProvider>
  );
}

export default App;
