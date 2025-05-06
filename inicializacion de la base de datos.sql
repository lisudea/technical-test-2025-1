-- Insertar roles
INSERT INTO roles (rol) VALUES 
('Aprobador'),
('Auxiliar');

-- Insertar auxiliares (usuarios)
INSERT INTO auxiliaresLis (cedula, nombre, usuario, contraseña, rol_id) VALUES 
('1001', 'Laura Gómez', 'laura.gomez', 'pass123', 2),
('1002', 'Carlos Pérez', 'carlos.perez', 'pass123', 2),
('2001', 'Marta Ruiz', 'marta.ruiz', 'admin123', 1),
('2002', 'José Díaz', 'jose.diaz', 'super123', 2);

-- Insertar actividades
INSERT INTO actividad (cedula_auxiliar, fecha_inicio, fecha_fin, descripcion, estado, fecha_aprobacion) VALUES 
('1001', '2025-04-01 08:00:00', '2025-04-01 12:00:00', 'Apoyo en evento académico', 'aprobado', '2025-04-02 10:00:00'),
('1001', '2025-04-05 14:00:00', '2025-04-05 18:00:00', 'Organización de archivos administrativos', 'en espera', NULL),
('1002', '2025-04-03 09:00:00', '2025-04-03 11:00:00', 'Revisión de informes mensuales', 'rechazado', '2025-04-04 11:30:00'),
('1002', '2025-04-07 13:00:00', '2025-04-07 17:00:00', 'Asistencia en laboratorio de informática', 'aprobado', '2025-04-08 08:00:00');