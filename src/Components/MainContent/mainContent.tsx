/******************************************************************************************
 * Component que represente la pàgina principal de contingut. S'encarrega de fer de contenidor
 * pels altres components a més de ser l'encarregat de agafar les dades de la db
 ******************************************************************************************/

// React
import React, {Fragment, useEffect, useRef, useState} from 'react';
import { string } from 'prop-types';

// Components de la pàgina
import SideBarNav from "../SideBarNav/sideBarNav";
import List from "../List/list";
import ErrorMessage from "../ErrorMessage/errorMessage";

// Estils i kits
import {CircularProgress, Container, Typography, useMediaQuery} from "@mui/material";
import './_mainContent.scss';

const themeClasses = {
    container: 'main-content',
    tableSection: 'table-section',
    tabletContainer: 'tablet-container'
}

const DB_URL = 'http://localhost:5000/';

/**************************************************************************************************************
* Objecte encarregat d'emmagatzemar estàticament les dades les quals ja s'han obtingut mitjançant una petició.
* Aquest objecte permet fer només una petició per taula de dades i quan sigui necessari, ja que al estar fora del component
* no es redefineix fins que l'usuari recarregui. Gràcies a això s'eliminen moltes càrregues innecessàries i es brinda
* una usabilitat molt més fluida.
****************************************************************************************/
const dataStorage = new Map<string, any[]> ([
    ['designs', []],
    ['setouts', []],
    ['users', []]
]);

const MainContent = (props: { dataType: 'designs' | 'setouts'; }) => {
    const {
        dataType // designs o setouts
    } = props;

    // Estat que emmagatzema temporalment les dades extretes, abans de ficarles al objecte abans mencionat
    const [listRows, setListRows] = useState(dataStorage.get(dataType)?.length !== 0 ? dataStorage.get(dataType) : null);

    // Estat que defineix el moment de fer una transició
    const [transition, setTransition] = useState<string>('');

    // Marca si hi ha hagut un error en alguna petició
    const [error, setError] = useState<any>(null);

    // Marca el moment on s'està esperant la resposta de les peticions
    const [loading, setLoading] = useState<boolean>(false);

    // Referència per a evitar que el useEffect s'activi la primera vegada que es renderitza el component, limitant només
    // el hook a les dependències
    const firstUpdate = useRef(true);

    /***************************************
     * Hook que en s'activa només si canvia la pàgina (p.ex: landing a designs).
     * S'encarrega de fer les peticions a l'api per obtenir les dades necessàries, però, gràcies a dataStorage
     * està programat de tal forms que només fa cada petició una vegada i quan es necessita, es a dir, que no demanarà
     * les dades de setouts fins que no s'hi navegui per a optimitzar el rendiment de l'aplicació.
     */
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        } else {
            //Si ja es tenen les dades no es fa la petició
            if (dataStorage.get(dataType)?.length === 0) {
                setLoading(true);
                fetch(`${DB_URL}${dataType}`)
                    .then(resp => {
                        // Si hi ha un problema s'activa el missatge d'error
                        if (!resp.ok) {
                            throw new Error('Oops, something went wrong');
                        }
                        return resp.json();
                    })
                    .then(data => {
                        // S'itera i organitza la informació
                        const rows = data.map((value: any, index: number) => {
                            const tempMap = new Map();
                            for (const objItem in value) {
                                if (objItem !== 'status') {
                                    tempMap.set(objItem, value[objItem]);
                                }
                            }
                            return tempMap;
                        });

                        // S'omplena la informació estàticament
                        dataStorage.set(dataType, rows);

                        // Com la taula designs necessita informació dels usuaris, abans de crear la llista es
                        // realitza la petició a usuaris
                        if (dataType === 'designs') {
                            fetch(`${DB_URL}users`)
                                .then(resp => {
                                    if (!resp.ok) {
                                        throw new Error('Oops, something went wrong');
                                    }
                                    return resp.json();
                                })
                                .then(data => {
                                    const users = data.map((value: any) => {
                                        const tempMap = new Map();
                                        for (const objItem in value) {
                                            tempMap.set(objItem, value[objItem]);
                                        }
                                        return tempMap;
                                    });
                                    dataStorage.set('users', users);
                                    setListRows(rows);
                                })
                                .catch((error: Error) => {
                                    setError(error);
                                });
                        } else {
                            // Si la taula es setouts no es fa cap més petició
                            setListRows(rows);
                        }
                    })
                    .catch((error: Error) => {
                        setError(error);
                    });
            }
        }
    }, [dataType]);

    // Una vegada acabin les peticions, tant negativament com positivament es para el loader
    useEffect(() => {
        if (error !== null || listRows !== null) {
            setLoading(false);
        }
    }, [error, listRows]);

    const matches1080 = useMediaQuery('(max-width:1080px)');

    return (
        <Fragment>
            {matches1080 ?
                <div className={`${themeClasses.tabletContainer} ${transition}`}>
                    <Typography role="content-title" variant={'h2'}>
                        {dataType}
                    </Typography>
                    <SideBarNav transition={transition} setTransition={setTransition}/>
                </div>
                :
                <SideBarNav transition={transition} setTransition={setTransition}/>}

            <Container className={`${themeClasses.container} ${transition}`}>

                {matches1080 ?
                    null :
                    <Typography role="content-title" variant={'h2'}>
                        {dataType}
                    </Typography>
                }

                <div className={themeClasses.tableSection}>
                    { loading
                        ? <CircularProgress />
                        : error !== null
                            ? <ErrorMessage />
                            : (dataStorage.get(dataType)?.length === 0 || listRows === null)
                                ? null
                                : <List
                                    rows={dataStorage.get(dataType) as Array<Map<string,any>>}
                                    users={dataStorage.get('users') as Array<Map<string,any>>}
                                    dataType={dataType}
                                />
                    }
                </div>

            </Container>
        </Fragment>
    );
}

MainContent.propTypes = {
    dataType: string.isRequired
}

export default MainContent;
