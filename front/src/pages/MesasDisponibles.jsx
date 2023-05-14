const mesasInicial = [
    {
        id: 1,
        nombre: "Mesa 1",
        capacidad: 4,
    },
    {
        id: 4,
        nombre: "Mesa 4",
        capacidad: 4,
    }
]

export default function MesasDisponibles() {
    return (
        <div>
            <h2>Mesas disponibles</h2>
            <div className="radio-select">
                {
                    mesasInicial?.length > 0 &&
                    mesasInicial.map((mesa) => (
                        // <label>
                        //     <input type="radio" />
                        //     <span>
                        //         {mesa.nombre} - {mesa.capacidad} personas
                        //     </span>
                        // </label>
                        <div>
                        <input type="radio" id={mesa.nombre} name={mesa.nombre} value="email" />
                        <label for={mesa.nombre}>{mesa.nombre} - {mesa.capacidad}</label>
                        </div>

                    ))

                }
            </div>
        </div>
    )
}