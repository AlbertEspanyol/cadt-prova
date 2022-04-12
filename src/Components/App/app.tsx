import React from 'react';

/*************************************************************
 * Punt de partida del projecte.
 *************************************************************/

// Importem el tema customitzat de material ui juntament amb el provider per a que afecti a tots els components de l'aplicació
import CadtTheme from '../../Utilities/materialUI_CustomTheme/cadtTheme';
import { ThemeProvider } from '@mui/material';

import './_app.scss';
import CustomRoutes from "../Routes/customRoutes";

// Objecte que fa referència a les classes del scss, per millor organització
const themeClasses = {
    container: 'cadt-app-container'
}

const App = () => {
    return (
        <ThemeProvider theme={CadtTheme}>
            <div className={themeClasses.container}>
                <CustomRoutes />
            </div>
        </ThemeProvider>
    );
}

export default App;