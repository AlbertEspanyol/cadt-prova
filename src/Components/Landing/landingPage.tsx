/***************************************************************************
 * Component que representa la pàgina d'entrada de la web. Consta del logo i
 * de dos opcions de navegació per anar a les llistes de 'designs' o de 'setouts'
 ******************************************************************************/

import React, {MouseEvent, useCallback, useEffect, useState} from 'react';

// Importem les eines de navegació
import {NavigateFunction, useNavigate} from "react-router-dom";

// Ús de Material UI
import { Button } from "@mui/material";

import './_landingPage.scss';

// Definim les constants
const DESIGNS: string = 'designs';
const SETOUTS: string = 'setouts';
const ANIMATION_TIMING: number = 700;

// Variable que controla quantes vegades s'ha renderitzat el component.
// Útil per definir animacions una vegada ja s'ha entrat a la página
let renderTimes: number = 0;

// Objecte que fa referència a les classes del scss
const themeClasses = {
    container: 'landing-container',
    content: 'landing-content',
    nav: 'landing-nav'
}

const LandingPage = () => {
    // Només es vol la transició d'opacitat quan es torni de les pàgines de contingut
    const [transition, setTransition] = useState<string>(renderTimes > 0 ? 'popIn' : '');

    // Funció que ens permetrà canviar de pàgina
    const navigateTo: NavigateFunction = useNavigate();

    // Cada vegada que es renderitza el component sumem 1 a la variable que ho controla
    useEffect(() => { renderTimes++ }, []);

    // Onclick dels botons. Es fa servir useCallback ja que no la necessitem guardar en memòria cada vegada que es renderitza el component
    const linkClick = useCallback((evt: MouseEvent) => {
        evt.preventDefault();
        const target = evt.target as HTMLButtonElement;

        // S'activa l'animació
        setTransition('slide');

        // Una vegada ha acabat es navega a l'altra pàgina
        setTimeout(() => {
            navigateTo(`/${target.getAttribute('data-link')}`);
        }, ANIMATION_TIMING);
    }, []);

    return (
        <div className={`${themeClasses.container} ${transition}`}>
            <div className={themeClasses.content}>
                <img alt={'cadt-logo'} src={'./resources/imgs/Cadt-logo.png'}/>
                <nav className={themeClasses.nav}>
                    <Button variant={'cadtCustom'} onClick={linkClick} role="designs-landing-nav" data-link={DESIGNS}>{DESIGNS}</Button>
                    <Button variant={'cadtCustom'} onClick={linkClick} role="setouts-landing-nav" data-link={SETOUTS}>{SETOUTS}</Button>
                </nav>
            </div>
        </div>
    );
}

export default LandingPage;