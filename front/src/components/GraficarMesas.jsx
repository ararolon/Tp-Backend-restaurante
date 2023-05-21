export function GraficarMesas({ tamanho = 5, mesas }) {
  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${tamanho}, auto)`,
    gridTemplateRows: `repeat(${tamanho}, auto)`,
    border: "1px solid black",
    backgroundImage: "url('piso.jpg')",
    backgroundSize: "18%"
  };

  const mesaStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imgStyle = {
    height: "150px",
    width: "150px",
  };

  return (
    <div style={gridContainerStyle}>
      {/* foo div for all grid */}
      {Array(tamanho * tamanho)
        .fill()
        .map((_, i) => (
          <div
            key={i}
            style={{
              ...mesaStyle,
              height: "150px",
              width: "calc(150px + 24px) ",
            }}
          ></div>
        ))}
      {mesas?.length > 0 &&
        mesas.map((mesa) => {
          return (
            <div
              key={mesa.id}
              style={{
                ...mesaStyle,
                gridRow: mesa.posicion_x,
                gridColumn: mesa.posicion_y,
              }}
            >
              <img src="mesa2.png" alt="Imagen de mesa 1" style={imgStyle} />
              <div style={{ textAlign: "center", color:"black", background:"white"  }}>{mesa.nombre}</div>
            </div>
          );
        })}
    </div>
  );
}
