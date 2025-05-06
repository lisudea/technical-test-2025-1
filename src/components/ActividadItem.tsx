import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

interface ActividadItemProps {
  actividad: any;
  fetchActividades: () => void;
}

const ActividadItem: React.FC<ActividadItemProps> = ({
  actividad,
  fetchActividades,
}) => {
  const handleUpdateEstado = async (estado: string) => {
    try {
      await axios.put(
        `http://localhost:8080/api/actividades/estado/${actividad.id}?estado=${estado}`
      );
      fetchActividades();
    } catch (error) {
      console.error("Error actualizando estado", error);
    }
  };

  const estadoAprobado = actividad.estado === "APROBADO";
  const estadoRechazado = actividad.estado === "RECHAZADO";

  const cardStyle = {
    marginBottom: "15px",
    backgroundColor: estadoAprobado
      ? "#e6ffe6"
      : estadoRechazado
      ? "#ffe6e6"
      : "white",
  };

  const buttonStyle = {
    marginRight: "5px",
  };

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>{actividad.nombreAuxiliar}</Card.Title>
        <Card.Text>{actividad.descripcionActividad}</Card.Text>
        <Card.Text>Inicio: {actividad.inicio}</Card.Text>
        <Card.Text>Fin: {actividad.fin}</Card.Text>
        <Card.Text>Estado: {actividad.estado}</Card.Text>
        <Row className="mt-3">
          <Col md="auto">
            <Button
              variant="success"
              onClick={() => handleUpdateEstado("APROBADO")}
              disabled={estadoAprobado || estadoRechazado}
              style={buttonStyle}
            >
              Aprobar
            </Button>
          </Col>
          <Col md="auto">
            <Button
              variant="danger"
              onClick={() => handleUpdateEstado("RECHAZADO")}
              disabled={estadoAprobado || estadoRechazado}
            >
              Rechazar
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ActividadItem;
