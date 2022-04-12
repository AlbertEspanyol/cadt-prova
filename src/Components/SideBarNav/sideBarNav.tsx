/***********************************************************************************
 * Component que representa la barra de navegació lateral de la pàgina de contingut.
 * És el principal punt d'usabilitat de l'plicació.
 **********************************************************************************/

// React
import React, { useCallback } from 'react';
import {NavigateFunction, NavLink, useNavigate} from "react-router-dom";
import { string, func } from "prop-types";

// Estils i kits
import './_sideBarNav.scss';
import {ListItemIcon, ListItemText, MenuItem, MenuList, IconButton, useMediaQuery} from "@mui/material";
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import HomeIcon from '@mui/icons-material/Home';

const themeClasses = {
    container: 'side-bar-container',
    link: 'nav-link',
    active: 'active'
};

// Definim constants
const ANIMATION_TIMING: number = 700;

const SideBarNav = (props: { transition: string; setTransition: any; }) => {
    // Decosntruïm els props
    const {
        transition, // Defineix si hi ha transició o no
        setTransition  // Funció per a definir una transició
    } = props;

    // Fem ús de la funció de navegació
    const navigateTo: NavigateFunction = useNavigate();

    // Onclick que activa l'animació i la navegació per tornar a la landing
    const goHome = useCallback(() => {
        setTransition('slide');

        setTimeout(() => {
            navigateTo('/');
        }, ANIMATION_TIMING)
    }, []);

    /***************
     * S'ha fet ús del component NavLink de 'react-router-dom', el qual serveix per automàticament dirigir a la url indicada,
     * ja que presenta una funcionalitat molt útil; es capaç de detectar si actualment està en la pàgina a on dirigeix, per tant
     * facilitza l'estilització del menú
     ***************/

    const matches1080 = useMediaQuery('(max-width:1080px) and (min-width:600px)');

    return (
        <div className={`${themeClasses.container} ${transition}`}>
            <nav>
                { matches1080 ? null :
                    <IconButton onClick={goHome} role="back-home">
                        <HomeIcon fontSize={'large'} />
                    </IconButton>
                }

                <MenuList id={'main-nav'}>
                    <NavLink role="to-designs-from-bar" to="/designs" className={({ isActive }) =>
                        [
                            themeClasses.link,
                            isActive ? themeClasses.active : null,
                        ]
                            .filter(Boolean)
                            .join(" ")
                    }>
                        <MenuItem>
                            <ListItemIcon>
                                <DesignServicesIcon fontSize={'small'} />
                            </ListItemIcon>
                            <ListItemText>Designs</ListItemText>
                        </MenuItem>
                    </NavLink>

                    <NavLink role="to-setouts-from-bar" to="/setouts" className={({ isActive }) =>
                        [
                            themeClasses.link,
                            isActive ? themeClasses.active : null,
                        ]
                            .filter(Boolean)
                            .join(" ")
                    }>
                        <MenuItem>
                            <ListItemIcon>
                                <FilePresentIcon fontSize={'small'} />
                            </ListItemIcon>
                            <ListItemText>Setouts</ListItemText>
                        </MenuItem>
                    </NavLink>
                </MenuList>

                { matches1080 ?
                    <IconButton onClick={goHome} role="back-home">
                        <HomeIcon fontSize={'large'} />
                    </IconButton>
                    : null
                }
            </nav>
        </div>
    );
}

SideBarNav.propTypes = {
    transition: string.isRequired,
    setTransition: func.isRequired
}

export default SideBarNav;
