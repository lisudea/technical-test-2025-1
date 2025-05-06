import { useState, useEffect } from 'react'
import './App.css'
import { actividadService } from './api/actividadService'

function App() {
  const [activeTab, setActiveTab] = useState('registrar')
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertType, setAlertType] = useState('success')
  const [actividades, setActividades] = useState([])
  const [filtroSeleccionado, setFiltroSeleccionado] = useState(null)
  const [valorFiltro, setValorFiltro] = useState('')
  const [formData, setFormData] = useState({
    assistName: '',
    assistId: '',
    dateInit: '',
    horaInicio: '',
    horaFin: '',
    description: ''
  })
  const [errorHora, setErrorHora] = useState('')

  // Función para cargar las actividades
  const cargarActividades = async () => {
    try {
      const data = await actividadService.obtenerActividades()
      setActividades(data)
    } catch (error) {
      setAlertMessage('Error al cargar las actividades')
      setAlertType('error')
      setShowAlert(true)
    }
  }

  // Cargar actividades cuando se cambia a la pestaña de visualización
  useEffect(() => {
    if (activeTab === 'visualizar') {
      cargarActividades()
    }
  }, [activeTab])

  const validarHoras = (horaInicio, horaFin) => {
    const [horaIni, minIni] = horaInicio.split(':').map(Number)
    const [horaFinNum, minFin] = horaFin.split(':').map(Number)

    if (horaFinNum < horaIni || (horaFinNum === horaIni && minFin <= minIni)) {
      return false
    }
    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Validar horas cuando se modifica cualquiera de los dos campos
    if ((name === 'horaInicio' || name === 'horaFin') && formData.horaInicio && formData.horaFin) {
      if (!validarHoras(formData.horaInicio, value)) {
        setErrorHora('La hora de fin debe ser posterior a la hora de inicio')
      } else {
        setErrorHora('')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validar horas antes de enviar
    if (!validarHoras(formData.horaInicio, formData.horaFin)) {
      setAlertMessage('La hora de fin debe ser posterior a la hora de inicio')
      setAlertType('error')
      setShowAlert(true)
      return
    }

    try {
      // Formatear las fechas para que coincidan con el formato requerido
      const fechaSeleccionada = formData.dateInit
      const horaInicio = formData.horaInicio
      const horaFin = formData.horaFin

      // Combinar fecha y hora para crear el formato correcto
      const dateInit = `${fechaSeleccionada}T${horaInicio}:00`
      const dateEnd = `${fechaSeleccionada}T${horaFin}:00`

      const actividadData = {
        assistName: formData.assistName,
        assistId: parseInt(formData.assistId),
        dateInit: dateInit,
        dateEnd: dateEnd,
        description: formData.description,
        estado: "en espera"
      }

      await actividadService.crearActividad(actividadData)
      setAlertMessage('¡Actividad guardada exitosamente!')
      setAlertType('success')
      setShowAlert(true)
      
      // Limpiar el formulario
      setFormData({
        assistName: '',
        assistId: '',
        dateInit: '',
        horaInicio: '',
        horaFin: '',
        description: ''
      })
      setErrorHora('')
    } catch (error) {
      setAlertMessage('Error al guardar la actividad. Por favor, intente nuevamente.')
      setAlertType('error')
      setShowAlert(true)
    }
    
    setTimeout(() => {
      setShowAlert(false)
    }, 3000)
  }

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Función para formatear la hora
  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Función para formatear el estado
  const formatEstado = (estado) => {
    return estado.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  // Obtener valores únicos para los filtros
  const fechasUnicas = [...new Set(actividades.map(a => formatDate(a.dateInit)))].sort()
  const auxiliaresUnicos = [...new Set(actividades.map(a => a.assistId))].sort((a, b) => a - b)
  const estadosUnicos = ['en espera', 'aprobado', 'rechazado']

  // Manejar cambio de filtro
  const handleFiltroChange = (tipo) => {
    setFiltroSeleccionado(tipo)
    setValorFiltro('')
    if (tipo === 'fecha') {
      cargarActividades() // Cargar todas las actividades para el filtro de fecha
    }
  }

  // Manejar cambio de valor del filtro
  const handleValorFiltroChange = async (e) => {
    const nuevoValor = e.target.value
    setValorFiltro(nuevoValor)

    if (filtroSeleccionado === 'auxiliar' && nuevoValor) {
      try {
        const data = await actividadService.obtenerActividadesPorAuxiliar(nuevoValor)
        setActividades(data)
      } catch (error) {
        setAlertMessage('Error al cargar las actividades del auxiliar')
        setAlertType('error')
        setShowAlert(true)
      }
    } else if (filtroSeleccionado === 'fecha' && nuevoValor) {
      // El filtrado por fecha se hace en el cliente
      const actividadesFiltradas = actividades.filter(actividad => 
        formatDate(actividad.dateInit) === nuevoValor
      )
      setActividades(actividadesFiltradas)
    } else if (filtroSeleccionado === 'estado' && nuevoValor) {
      // El filtrado por estado se hace en el cliente
      const actividadesFiltradas = actividades.filter(actividad => 
        actividad.estado.toLowerCase() === nuevoValor.toLowerCase()
      )
      setActividades(actividadesFiltradas)
    } else {
      cargarActividades() // Cargar todas las actividades si no hay filtro
    }
  }

  // Función para actualizar el estado de una actividad
  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      await actividadService.actualizarEstadoActividad(id, nuevoEstado)
      // Actualizar la lista de actividades
      const actividadesActualizadas = actividades.map(actividad => 
        actividad.id === id ? { ...actividad, estado: nuevoEstado } : actividad
      )
      setActividades(actividadesActualizadas)
      setAlertMessage('Estado actualizado correctamente')
      setAlertType('success')
      setShowAlert(true)
    } catch (error) {
      setAlertMessage('Error al actualizar el estado')
      setAlertType('error')
      setShowAlert(true)
    }
  }

  return (
    <div className="app-container">
      {showAlert && (
        <div className={`alert ${alertType}`}>
          <span className="alert-icon">{alertType === 'success' ? '✓' : '⚠'}</span>
          <span>{alertMessage}</span>
        </div>
      )}
      <nav className="menu">
        <button 
          className={`menu-button ${activeTab === 'registrar' ? 'active' : ''}`}
          onClick={() => setActiveTab('registrar')}
        >
          Registrar Actividades
        </button>
        <button 
          className={`menu-button ${activeTab === 'visualizar' ? 'active' : ''}`}
          onClick={() => setActiveTab('visualizar')}
        >
          Visualizar Actividades Registradas
        </button>
      </nav>
      
      <main className="content">
        {activeTab === 'registrar' ? (
          <div className="registrar-container">
            <h2>Registrar Nueva Actividad</h2>
            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-group">
                <label htmlFor="assistName">Nombre del Auxiliar:</label>
                <input
                  type="text"
                  id="assistName"
                  name="assistName"
                  value={formData.assistName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="assistId">Documento del Auxiliar:</label>
                <input
                  type="number"
                  id="assistId"
                  name="assistId"
                  value={formData.assistId}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateInit">Día de la Actividad:</label>
                <input
                  type="date"
                  id="dateInit"
                  name="dateInit"
                  value={formData.dateInit}
                  onChange={handleChange}
                  required
                />ws
              </div>

              <div className="form-group">
                <label htmlFor="horaInicio">Hora de Inicio:</label>
                <input
                  type="time"
                  id="horaInicio"
                  name="horaInicio"
                  value={formData.horaInicio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="horaFin">Hora de Fin:</label>
                <input
                  type="time"
                  id="horaFin"
                  name="horaFin"
                  value={formData.horaFin}
                  onChange={handleChange}
                  required
                />
                {errorHora && <span className="error-message">{errorHora}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                />
              </div>

              <button type="submit" className="submit-button">
                Registrar Actividad
              </button>
            </form>
          </div>
        ) : (
          <div className="visualizar-container">
            <h2>Actividades Registradas</h2>
            
            <div className="filtros-container">
              <div className="filtros-botones">
                <button 
                  className={`filtro-boton ${filtroSeleccionado === 'fecha' ? 'active' : ''}`}
                  onClick={() => handleFiltroChange('fecha')}
                >
                  Fecha
                </button>
                <button 
                  className={`filtro-boton ${filtroSeleccionado === 'auxiliar' ? 'active' : ''}`}
                  onClick={() => handleFiltroChange('auxiliar')}
                >
                  Auxiliar
                </button>
                <button 
                  className={`filtro-boton ${filtroSeleccionado === 'estado' ? 'active' : ''}`}
                  onClick={() => handleFiltroChange('estado')}
                >
                  Estado
                </button>
              </div>

              {filtroSeleccionado && (
                <div className="filtro-select">
                  <select 
                    value={valorFiltro}
                    onChange={handleValorFiltroChange}
                    className="select-filtro"
                  >
                    <option value="">Seleccione {filtroSeleccionado === 'fecha' ? 'una fecha' : filtroSeleccionado === 'auxiliar' ? 'un auxiliar' : 'un estado'}</option>
                    {filtroSeleccionado === 'fecha' 
                      ? fechasUnicas.map(fecha => (
                          <option key={fecha} value={fecha}>{fecha}</option>
                        ))
                      : filtroSeleccionado === 'auxiliar'
                        ? auxiliaresUnicos.map(auxiliar => (
                            <option key={auxiliar} value={auxiliar}>{auxiliar}</option>
                          ))
                        : valorFiltro
                          ? [valorFiltro].map(estado => (
                              <option key={estado} value={estado}>{formatEstado(estado)}</option>
                            ))
                          : estadosUnicos.map(estado => (
                              <option key={estado} value={estado}>{formatEstado(estado)}</option>
                            ))
                    }
                  </select>
                </div>
              )}
            </div>

            <div className="actividades-lista">
              {actividades.length === 0 ? (
                <p className="no-actividades">No hay actividades registradas</p>
              ) : (
                actividades.map((actividad) => (
                  <div key={actividad.id} className="actividad-card">
                    <div className="actividad-header">
                      <h3>{actividad.assistName}</h3>
                      <select 
                        value={actividad.estado}
                        onChange={(e) => handleEstadoChange(actividad.id, e.target.value)}
                        className={`estado-select ${actividad.estado}`}
                      >
                        <option value="en espera">En espera</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="rechazado">Rechazado</option>
                      </select>
                    </div>
                    <div className="actividad-info">
                      <p><strong>Documento:</strong> {actividad.assistId}</p>
                      <p><strong>Fecha:</strong> {formatDate(actividad.dateInit)}</p>
                      <p><strong>Horario:</strong> {formatTime(actividad.dateInit)} - {formatTime(actividad.dateEnd)}</p>
                      <p><strong>Descripción:</strong> {actividad.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
