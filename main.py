from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permitir solicitudes CORS desde cualquier origen

# Lista donde se guardan las actividades
actividades = []

# Estados permitidos para las actividades
estados = ['aprobada', 'en espera', 'rechazada']

@app.route('/actividades', methods=['POST'])
def crear_actividad():
    """Crear una nueva actividad."""
    data = request.get_json()

    # Validar los datos obligatorios
    campos_obligatorios = ['nombre_auxiliar', 'documento_auxiliar', 'fecha_inicio', 'fecha_fin', 'descripcion']
    for campo in campos_obligatorios:
        if campo not in data:
            return jsonify({'error': f'Falta el campo {campo}, recuerda que es obligatorio'}), 400

    # Validar formato de fechas
    try:
        fecha_inicio = datetime.strptime(data['fecha_inicio'], '%d-%m-%Y').date()
        fecha_fin = datetime.strptime(data['fecha_fin'], '%d-%m-%Y').date()
    except ValueError:
        return jsonify({'error': 'Formato de fecha inválido. Usa DD-MM-YYYY'}), 400

    # Validar que la fecha de inicio no sea mayor a la fecha final
    if fecha_inicio > fecha_fin:
        return jsonify({'error': 'La fecha de inicio no puede ser mayor a la fecha final'}), 400

    # Crear la actividad
    actividad = {
        'id': len(actividades) + 1,
        'nombre_auxiliar': data['nombre_auxiliar'],
        'documento_auxiliar': data['documento_auxiliar'],
        'fecha_inicio': fecha_inicio,
        'fecha_fin': fecha_fin,
        'descripcion': data['descripcion'],
        'estado': 'en espera',  # Estado por defecto
    }

    actividades.append(actividad)
    # Convertir fechas a cadenas antes de devolver la respuesta
    actividad['fecha_inicio'] = actividad['fecha_inicio'].strftime('%d-%m-%Y')
    actividad['fecha_fin'] = actividad['fecha_fin'].strftime('%d-%m-%Y')

    return jsonify(actividad), 201

@app.route('/actividades', methods=['GET'])
def obtener_actividades():
    """Obtener actividades con filtros opcionales."""
    documento_auxiliar = request.args.get('documento_auxiliar')
    id_actividad = request.args.get('id')
    estado = request.args.get('estado')

    resultados = actividades

    # Filtrar por documento del auxiliar
    if documento_auxiliar:
        resultados = [actividad for actividad in resultados if actividad['documento_auxiliar'] == documento_auxiliar]

    # Filtrar por ID de actividad
    if id_actividad:
        try:
            id_actividad = int(id_actividad)
            resultados = [actividad for actividad in resultados if actividad['id'] == id_actividad]
        except ValueError:
            return jsonify({'error': 'ID de actividad inválido. Debe ser un número entero'}), 400

    # Filtrar por estado
    if estado:
        if estado not in estados:
            return jsonify({'error': f'Estado inválido. Debe ser uno de {estados}'}), 400
        resultados = [actividad for actividad in resultados if actividad['estado'] == estado]

    # Convertir fechas a cadenas en formato DD-MM-YYYY
    for actividad in resultados:
        if isinstance(actividad['fecha_inicio'], datetime):
            actividad['fecha_inicio'] = actividad['fecha_inicio'].strftime('%d-%m-%Y')
        if isinstance(actividad['fecha_fin'], datetime):
            actividad['fecha_fin'] = actividad['fecha_fin'].strftime('%d-%m-%Y')

    return jsonify(resultados if resultados else []), 200

@app.route('/actividades/<int:id_actividad>/estado', methods=['PUT'])
def actualizar_estado_actividad(id_actividad):
    """Actualizar el estado de una actividad."""
    datos = request.get_json()
    nuevo_estado = datos.get('estado')

    # Validar que el nuevo estado sea válido
    if nuevo_estado not in ['aprobada', 'rechazada']:
        return jsonify({'error': 'Estado inválido. Debe ser aprobada o rechazada'}), 400

    # Buscar la actividad por ID
    for actividad in actividades:
        if actividad['id'] == id_actividad:
            actividad['estado'] = nuevo_estado
            return jsonify(actividad), 200

    return jsonify({'error': 'Actividad no encontrada'}), 404

@app.route('/actividades/contar', methods=['GET'])
def calcular_actividades():
    """Calcular la cantidad de actividades con filtros opcionales."""
    documento_auxiliar = request.args.get('documento_auxiliar')
    fecha = request.args.get('fecha')
    resultado = actividades

    # Filtrar por fecha
    if fecha:
        try:
            fecha = datetime.strptime(fecha, '%d-%m-%Y').date()
            resultado = [actividad for actividad in resultado if actividad['fecha_inicio'] == fecha]
        except ValueError:
            return jsonify({'error': 'Formato de fecha inválido. Usa DD-MM-YYYY'}), 400

    # Filtrar por documento del auxiliar
    if documento_auxiliar:
        resultado = [actividad for actividad in resultado if actividad['documento_auxiliar'] == documento_auxiliar]

    return jsonify({
        'fecha': fecha.strftime('%d-%m-%Y') if fecha else 'todas',
        'documento_auxiliar': documento_auxiliar if documento_auxiliar else 'todos',
        'total_actividades': len(resultado),
    }), 200

if __name__ == '__main__':
    app.run(debug=True)