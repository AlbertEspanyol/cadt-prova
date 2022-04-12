import React from 'react';

/*************************************************************
 * Emmagatzema les rutes.
 *************************************************************/

// Utilitzem react-router per a navegar entre les diferents vistes
import { Route, Routes } from 'react-router-dom';

// Importem els dos components principals
import MainContent from '../MainContent/mainContent';
import LandingPage from '../Landing/landingPage';

// Definim les constants de les dos vistes
const DESIGNS: 'designs' = 'designs';
const SETOUTS: 'setouts' = 'setouts';

const CustomRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path={DESIGNS} element={<MainContent dataType={DESIGNS} />} />
            <Route path={SETOUTS} element={<MainContent dataType={SETOUTS} />} />
        </Routes>
    );
}

export default CustomRoutes;