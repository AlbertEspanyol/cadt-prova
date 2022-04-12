import React from 'react';
import {render, fireEvent, screen, waitFor} from '@testing-library/react'
import '@testing-library/jest-dom'

import MainContent from '../../Components/MainContent/mainContent'
import { BrowserRouter } from "react-router-dom";

/**************************************************************************************************
 * Tests d'integració entre els components que fan peticions i utilitzen els resultats de peticions (MainContent i List).
 * Objectiu: Correcte control de les peticions (errors inclosos) i correcta comunicació de la informació obtinguda
 **************************************************************************************************/

const DB_URL = 'http://localhost:5000/';

/**
 * Comprovem que les peticions de l'apartat de designs son satisfactòries i que generen la llista de forma correcta.
 * La llista de designs requereix d'una altra petició a la taula d'usuaris, per tant també es comprova que aquesta
 * no es generi fins a no tenir les dades de designs i de users.
 */
test('check for correct designs fetching',  async () => {
    // Renderitzem amb el provider <BrowserRouter> envoltant ja que sinó no es podria simular la navegació
    render(
      <BrowserRouter>
        <MainContent dataType={'designs'}/>
      </BrowserRouter>
    );

    // Fem la mateixa crida
    await fetch(`${DB_URL}designs`)
        .then(resp => {
            // Si la petició dona error els tests falla
            if (!resp.ok) {
                throw new Error('ko');
            }

            // La llista no hauria d'estar encara generada
            expect(screen.queryByRole('list')).not.toBeInTheDocument();

            fetch(`${DB_URL}users`)
                .then(resp => {
                    if (!resp.ok) {
                        throw new Error('ko');
                    }

                    // Una vegada obtingudes les dades dels usuaris i dels designs, la taula s'ha d'haver generat
                    expect(screen.getByRole('list')).toExist();

                    // Per comprovar que les dades s'han extret correctament es comprova que un camp de la llista
                    // amb un valor únic de l'apartat de designs existeixi
                    expect(screen.getByRole('wales-title')).toExist();

                    // Comprovem que les dades dels usuaris s'han agafat bé
                    expect(screen.getAllByRole('user-initials')[0]).toBeNonEmptyString();
                });
        });
});

/**
 * Comprovem que les peticions de l'apartat de 'setouts' son satisfactòries i que generen la llista de forma correcta.
 */
test('check for correct setouts fetching',  async () => {
    // Renderitzem amb el provider <BrowserRouter> envoltant ja que sinó no es podria simular la navegació
    render(
        <BrowserRouter>
            <MainContent dataType={'setouts'}/>
        </BrowserRouter>
    );

    // Fem la mateixa crida
    await fetch(`${DB_URL}setouts`)
        .then(resp => {
            // Si la petició dona error els tests falla
            if (!resp.ok) {
                throw new Error('ko');
            }

            // Deixem minúscula espera de 10ms per deixar temps als components de renderitzar-se
            setTimeout(() => {
                // La llista ja hauria d'existir
                expect(screen.getByRole('list')).toExist();

                // Per comprovar que les dades s'han extret correctament es comprova que un camp de la llista
                // amb un valor únic de l'apartat de setouts existeixi
                expect(screen.getByRole('machine width-title')).toExist();
            }, 10);
        });
});

/**
 * Comprovem que el missatge d'error es mostra bé.
 */
test('check for error in fetch',  async () => {
    // Renderitzem amb el provider <BrowserRouter> envoltant ja que sinó no es podria simular la navegació
    render(
        <BrowserRouter>
            <MainContent dataType={'setouts'}/>
        </BrowserRouter>
    );

    // Fem una crida errònea
    await fetch(`${DB_URL}lksdflksdf`)
        .then(resp => {
            // Si la petició dona error els tests falla
            if (!resp.ok) {
                throw new Error('ko');
            }
        }).catch(() => {
            // Deixem minúscula espera de 10ms per deixar temps als components de renderitzar-se
            setTimeout(() => {
                // El missatge d'error hauria d'existir
                // eslint-disable-next-line jest/no-conditional-expect
                expect(screen.getByRole('alert')).toExist();
            }, 10);
        });
});