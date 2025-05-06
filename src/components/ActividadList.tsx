import React from "react";
import { Row, Col } from "react-bootstrap";
import ActividadItem from "./ActividadItem";

interface ActividadListProps {
  actividades: any[];
  fetchActividades: () => void;
}

const ActividadList: React.FC<ActividadListProps> = ({
  actividades,
  fetchActividades,
}) => {
  return (
    <div>
      <h4>Actividades Registradas</h4>
      <Row xs={1} sm={2} md={3} lg={3} xl={3} className="g-4">
        {actividades.map((actividad) => (
          <Col key={actividad.id}>
            <ActividadItem
              actividad={actividad}
              fetchActividades={fetchActividades}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ActividadList;
