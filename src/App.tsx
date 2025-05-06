import React, { useEffect, useState } from "react";
import { Container, Tabs, Tab, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import ActividadList from "./components/ActividadList";
import ActividadForm from "./components/ActividadForm";

const App: React.FC = () => {
  const [actividades, setActividades] = useState<any[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<any[]>([]);
  const [filterByDate, setFilterByDate] = useState<string>("");
  const [filterById, setFilterById] = useState<string>("");
  const [filterByCedula, setFilterByCedula] = useState<string>("");
  const [filterByEstado, setFilterByEstado] = useState<string>("");

  useEffect(() => {
    fetchActividades();
  }, []);

  const fetchActividades = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/actividades");
      setActividades(response.data);
      setFilteredActivities(response.data);
    } catch (error) {
      console.error("Error fetching actividades", error);
    }
  };

  const handleFilter = () => {
    let filtered = [...actividades];

    if (filterByDate) {
      filtered = filtered.filter((actividad) =>
        actividad.inicio.includes(filterByDate)
      );
    }

    if (filterById) {
      filtered = filtered.filter((actividad) =>
        String(actividad.id).includes(filterById)
      );
    }

    if (filterByCedula) {
      filtered = filtered.filter((actividad) =>
        actividad.cedulaAuxiliar
          .toLowerCase()
          .includes(filterByCedula.toLowerCase())
      );
    }

    if (filterByEstado && filterByEstado !== "TODOS") {
      filtered = filtered.filter(
        (actividad) => actividad.estado === filterByEstado
      );
    }

    setFilteredActivities(filtered);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Registro de Actividades</h2>
        </Col>
      </Row>
      <Tabs defaultActiveKey="crear" id="actividad-tabs" className="mb-3">
        <Tab eventKey="crear" title="Crear Actividad">
          <Row className="mt-4">
            <Col>
              <ActividadForm fetchActividades={fetchActividades} />
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="listar" title="Listar Actividades">
          <Row className="mt-4">
            <Col>
              <h4>Filtrar Actividades</h4>
              <Form.Group controlId="filterByDate" className="mb-3">
                <Form.Label>Filtrar por Fecha:</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setFilterByDate(e.target.value)}
                  value={filterByDate}
                />
              </Form.Group>
              <Form.Group controlId="filterById" className="mb-3">
                <Form.Label>Filtrar por ID:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setFilterById(e.target.value)}
                  value={filterById}
                />
              </Form.Group>
              <Form.Group controlId="filterByCedula" className="mb-3">
                <Form.Label>Filtrar por Cédula:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setFilterByCedula(e.target.value)}
                  value={filterByCedula}
                />
              </Form.Group>
              <Form.Group controlId="filterByEstado" className="mb-3">
                <Form.Label>Filtrar por Estado:</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => setFilterByEstado(e.target.value)}
                  value={filterByEstado}
                >
                  <option value="TODOS">Todos</option>
                  <option value="EN_ESPERA">En Espera</option>
                  <option value="APROBADO">Aprobado</option>
                  <option value="RECHAZADO">Rechazado</option>
                </Form.Control>
              </Form.Group>
              <Button onClick={handleFilter}>Filtrar</Button>
              <Button
                onClick={() => {
                  setFilterByDate("");
                  setFilterById("");
                  setFilterByCedula("");
                  setFilterByEstado("TODOS");
                  setFilteredActivities(actividades);
                }}
                className="ms-2"
              >
                Limpiar Filtros
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <ActividadList
                actividades={filteredActivities}
                fetchActividades={fetchActividades}
              />
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
