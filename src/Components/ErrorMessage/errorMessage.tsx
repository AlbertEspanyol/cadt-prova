import React from 'react';

/*************************************************************
 * Missatge d'error customitzat. Encara que sembla pobre,
 * està en forma de component per la seva potencia reusabilitat
 *************************************************************/

import './_errorMessage.scss';

// Objecte que fa referència a les classes del scss, per millor organització
const themeClasses = {
    container: 'error-msg'
}

const ErrorMessage = () => {
    return (
        <div role={'alert'} className={themeClasses.container}>
            <img  alt={'error'} src={'./resources/imgs/Error.jpg'}/>
        </div>
    );
};

export default ErrorMessage;