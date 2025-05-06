import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

interface ActividadFormProps {
  fetchActividades: () => void;
}

const ActividadForm: React.FC<ActividadFormProps> = ({ fetchActividades }) => {
  const [nombre, setNombre] = useState<string>("");
  const [cedula, setCedula] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [inicio, setInicio] = useState<string>("");
  const [fin, setFin] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>("");
  const [popupType, setPopupType] = useState<"success" | "danger">("success");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/actividades", {
        nombreAuxiliar: nombre,
        cedulaAuxiliar: cedula,
        descripcionActividad: descripcion,
        inicio,
        fin,
      });
      fetchActividades();
      setPopupMessage(
        `Actividad creada:\nNombre: ${nombre}\nCédula: ${cedula}\nDescripción: ${descripcion}`
      );
      setPopupType("success");
      setShowPopup(true);
      setNombre("");
      setCedula("");
      setDescripcion("");
      setInicio("");
      setFin("");
      setTimeout(() => setShowPopup(false), 5000);
    } catch (error) {
      console.error("Error creando actividad", error);
      setPopupMessage("Error al crear la actividad.");
      setPopupType("danger");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 5000);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre del Auxiliar</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formCedula">
              <Form.Label>Cédula</Form.Label>
              <Form.Control
                type="text"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formDescripcion" className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="formInicio">
              <Form.Label>Fecha y Hora de Inicio</Form.Label>
              <Form.Control
                type="datetime-local"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formFin">
              <Form.Label>Fecha y Hora de Fin</Form.Label>
              <Form.Control
                type="datetime-local"
                value={fin}
                onChange={(e) => setFin(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, offset: 4 }} className="d-grid">
            <Button variant="primary" type="submit">
              Crear Actividad
            </Button>
          </Col>
        </Row>
      </Form>

      {showPopup && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: popupType === "success" ? "#d4edda" : "#f8d7da",
            color: popupType === "success" ? "#155724" : "#721c24",
            border: `1px solid ${
              popupType === "success" ? "#c3e6cb" : "#f5c6cb"
            }`,
            padding: "15px",
            borderRadius: "5px",
            zIndex: 1000,
            fontSize: "0.9rem",
            whiteSpace: "pre-line",
            textAlign: "center",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default ActividadForm;
