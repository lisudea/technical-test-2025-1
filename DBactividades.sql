CREATE DATABASE DBactividades
go
use DBactividades
GO
CREATE TABLE roles (
    id smallint PRIMARY KEY IDENTITY(1,1),
    rol VARCHAR(100) NOT NULL
);

CREATE TABLE auxiliaresLis (
    cedula VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario VARCHAR(100) NOT NULL,
    contraseña VARCHAR(100) NOT NULL,
	rol_id smallint References roles(id)
);

CREATE TABLE estadoActividad (
    estado VARCHAR(20) PRIMARY KEY

);

INSERT INTO estadoActividad (estado) VALUES 
('aprobado'), 
('rechazado'), 
('en espera');

CREATE TABLE actividad (
    id int PRIMARY KEY IDENTITY (1,1),
    cedula_auxiliar VARCHAR(20) REFERENCES auxiliaresLis(cedula),
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    descripcion VARCHAR(MAX) NOT NULL,
    estado VARCHAR(20) Default 'en espera' REFERENCES estadoActividad(estado),
    fecha_aprobacion DATETIME
);

