import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ActividadList from './pages/ActividadList';
import { CssBaseline, Container } from '@mui/material';

const App: React.FC = () => {
  return (
    <Router>
      <CssBaseline />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<ActividadList />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;