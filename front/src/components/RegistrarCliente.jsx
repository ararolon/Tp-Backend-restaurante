import { postCliente } from "../api";

export default function RegistarCliente({ cedula, onChange }) {
  return (
    <div>
      <p>Cedula no encontrada en el sistema</p>
      <p>Por favor registrese</p>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formdata = new FormData(e.target);
            const data = Object.fromEntries(formdata);
            data.cedula = cedula;
            await postCliente(data);
            onChange()
          }}
          className="radio-select"
          style={{ gap: "16px" }}
        >
          <label htmlFor="nombre">
            Nombre
            <input type="text" name="nombre" style={{ marginLeft: "8px" }} />
          </label>
          <label htmlFor="apellido">
            Apellido
            <input type="text" name="apellido" style={{ marginLeft: "8px" }} />
          </label>
          <button>Registrar usuario</button>
        </form>
      </div>
    </div>
  );
}
