import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";

export const Ticketpdf = ({ consumo, clientes, detalles, productos }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.title}>Ticket #{consumo.id}</Text>
        <Text style={styles.text}>
          Fecha: {(new Date).toLocaleDateString()}
        </Text>
        <Text style={styles.text}>Cliente: {(clientes.find(c=>c.id==consumo.id_cliente))?.nombre} {(clientes.find(c=>c.id==consumo.id_cliente))?.apellido}</Text>
        <Text style={styles.title}>Detalles de consumo:</Text>
        {detalles?.map((detalle) => (
          <Text key={detalle.id} style={styles.text}>
            - {detalle.cantidad}{" "}
            {
              productos.find((producto) => producto.id == detalle.id_producto)
                .nombre
            }{" "}
            {
              productos.find((producto) => producto.id == detalle.id_producto)
                .precio
            }
          </Text>
        ))}
        <Text style={styles.text}>Total: {consumo.total}</Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
