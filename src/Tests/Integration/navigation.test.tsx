import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import App from '../../Components/App/app';
import MainContent from '../../Components/MainContent/mainContent'
import { BrowserRouter } from "react-router-dom";

/**************************************************************************************************
 * Tests d'integració entre els components de navegació LandingPage i SideBar.
 * Objectiu: Correcta resposta a l'input de l'usuari i  una correcta comunicació entre components
 **************************************************************************************************/


/**
 * Comprovar que si des de la landing es clica el botó de 'designs', s'actualitzi la url a /designs, es mostri la pantalla de
 * contingut (cosa que ve implícita comprovant l'existència de la SideBar), i els elements de navegació es comuniquin
 * correctament (el botó 'Designs' de la SideBar tingui la classe 'active')
 */
test('check for correct navigation to designs from landing',  () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

    // Simulem el click de l'usuari
    fireEvent.click(screen.getByRole('designs-landing-nav'));

    // Esperem a l'animació
    setTimeout(() => {
        // Volem trobar /designs a la url, el botó del sideBar de designs actiu i el de setouts inactiu
        expect(global.window.location.pathname).toEqual('/designs');
        expect(screen.getByRole('to-designs-from-bar')).toHaveClass('active');
        expect(screen.getByRole('to-setouts-from-bar')).not.toHaveClass('active');

    }, 700);
});


/**
 * Comprovar que si des de la landing es clica el botó de 'setouts', s'actualitzi la url a /setouts, es mostri la pantalla de
 * contingut (cosa que ve implícita comprovant l'existència de la SideBar), i els elements de navegació es comuniquin
 * correctament (el botó 'Setouts' de la SideBar tingui la classe 'active').
 */
test('check for correct navigation to setouts from landing',  () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );

    // Simulem el click de l'usuari
    fireEvent.click(screen.getByRole('setouts-landing-nav'));

    // Esperem a l'animació
    setTimeout(() => {
        // Volem trobar /setouts a la url, el botó del sideBar de setouts actiu i el de designs inactiu
        expect(global.window.location.pathname).toEqual('/setouts');
        expect(screen.getByRole('to-setouts-from-bar')).toHaveClass('active');
        expect(screen.getByRole('to-designs-from-bar')).not.toHaveClass('active');
    }, 700);
});


/**
 * Comprovar que si des de la pàgina de contingut es clica el botó de 'setouts' de la SideBar, s'actualitzi la url a
 * /setouts, es mostri el títol corresponent i els elements de navegació es comuniquin correctament (el botó 'Setouts'
 * de la SideBar tingui la classe 'active' i el de 'Designs' no).
 */
test('check for correct navigation to setouts from side bar',  () => {
    // Renderitzem amb el provider <BrowserRouter> envoltant ja que sinó no es podria simular la navegació
    render(
        <BrowserRouter>
            <MainContent dataType={'designs'}/>
        </BrowserRouter>
    );

    // Simulem el click de l'usuari
    fireEvent.click(screen.getByRole('to-setouts-from-bar'));

    // Esperem 10ms ja que l'actualització de dades pot no ser del tot instantània
    setTimeout(() => {
        expect(global.window.location.pathname).toEqual('/setouts');
        expect(screen.getByRole('content-title')).toHaveTextContent('setouts');
        expect(screen.getByRole('to-setouts-from-bar')).toHaveClass('active');
        expect(screen.getByRole('to-designs-from-bar')).not.toHaveClass('active');
    }, 10);
});


/**
 * Comprovar que si des de la pàgina de contingut es clica el botó de 'Designs' de la SideBar, s'actualitzi la url a
 * /designs, es mostri el títol corresponent i els elements de navegació es comuniquin correctament (el botó 'Designs'
 * de la SideBar tingui la classe 'active' i el de 'Setouts' no).
 */
test('check for correct navigation to desings from side bar',  () => {
    // Renderitzem amb el provider <BrowserRouter> envoltant ja que sinó no es podria simular la navegació
    render(
        <BrowserRouter>
            <MainContent dataType={'setouts'}/>
        </BrowserRouter>
    );

    // Simulem el click de l'usuari
    fireEvent.click(screen.getByRole('to-designs-from-bar'));

    setTimeout(() => {
        expect(global.window.location.pathname).toEqual('/designs');
        expect(screen.getByRole('content-title')).toHaveTextContent('designs');
        expect(screen.getByRole('to-designs-from-bar')).toHaveClass('active');
        expect(screen.getByRole('to-setouts-from-bar')).not.toHaveClass('active');
    }, 10);
});


/**
 * Comprovar que si des de la pàgina de contingut es clica el botó de 'Casa' ens porti a la Landing
 */
test('check for correct navigation to landing from content page',  () => {
    // Renderitzem amb el provider <BrowserRouter> envoltant ja que sinó no es podria simular la navegació
    render(
        <BrowserRouter>
            <MainContent dataType={'designs'}/>
        </BrowserRouter>
    );

    // Simulem el click de l'usuari
    fireEvent.click(screen.getByRole('back-home'));

    // Esperem a l'animació
    setTimeout(() => {
        expect(global.window.location.pathname).toEqual('/');
        expect(screen.getByRole('content-title')).toExist(); // Per assegurar-nos comprovem que, per exemple, el component de títol ja no existeix
    }, 700);
});