import React from 'react';
import { makeStyles } from '@mui/styles'; // Importing makeStyles for styling
import Homepage from './Pages/HomePage';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Use `Routes` for newer React Router
import CoinPage from './Pages/CoinPage';
import Header from './components/Header';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh',
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        {/* Use Routes and element prop for React Router v6 */}
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} exact />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
