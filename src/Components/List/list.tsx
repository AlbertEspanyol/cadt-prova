/***********************************************************************************
 * Component que representa la llista on es mostra el contingut de la db. S'encarrega de
 * organitzar, col·locar al seu lloc i estilitzar les dades que rep per props.
 **********************************************************************************/

// React
import React, {useCallback} from 'react';
import { array, string } from "prop-types";

// Estils i kits
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Typography} from "@mui/material";
import './_list.scss';

const themeClasses = {
    container: 'list-container',
    userStyling: 'name-ball'
};

const List = (props: { rows: Array<Map<string,any>>; users: Array<Map<string,any>>; dataType: 'designs' | 'setouts'; }) => {
    const {
        rows, // Totes les files a mostrar
        users, // Dades dels usuaris
        dataType // Designs o Setouts
    } = props;

    // Extraiem els títols de la taula i els ordenem com als mock-ups
    const orderedTitles: string[] = [];
    rows[0].forEach((value: any, key: string) => {
        switch (dataType) {
            case 'designs':
                switch (key){
                    case 'name':
                        orderedTitles.splice(0, 0, key);
                        break;
                    case 'courses':
                        orderedTitles.splice(1, 0, key);
                        break;
                    case 'wales':
                        orderedTitles.splice(2, 0, key);
                        break;
                    case 'updated':
                        orderedTitles.splice(3, 0, key);
                        break;
                    case 'user_id_last_update':
                        orderedTitles.splice(4, 0, key);
                        break;
                }
                break;
            case 'setouts':
                switch (key){
                    case 'name':
                        orderedTitles.splice(0, 0, key);
                        break;
                    case 'machine_name':
                        orderedTitles.splice(1, 0, key);
                        break;
                    case 'machine_width':
                        orderedTitles.splice(2, 0, key);
                        break;
                    case 'courses':
                        orderedTitles.splice(3, 0, key);
                        break;
                    case 'updated':
                        orderedTitles.splice(4, 0, key);
                        break;
                }
                break;
        }
    });

    // Relacionem les dades dels usuaris amb la resta
    rows.forEach(map => {
       const userId = map.get('user_id_last_update');
       users.forEach(user => {
           if (user.get('id') === userId) map.set('user_id_last_update', user.get('name'));
       });
    });

    // Estilitzar els títols
    const processTitle = useCallback((title: string) => {
        if (title === 'user_id_last_update') return 'By';
        if (title.includes('_')) return title.replace(/_/g, ' ');
        return title;
    }, []);

    // Estilitzar el contingut (dates, usuaris...)
    const processContent = useCallback((content: string, type: string) => {
        // Estilitzem els usuaris
        if (type === 'user_id_last_update') {
            const firstLetters: string = content
                .split(' ')
                .map(word => word[0])
                .join('');

            return (
                <div className={themeClasses.userStyling}>
                    <Typography role={'user-initials'} variant={'h6'}>{firstLetters}</Typography>
                </div>
            );
        }

        // Estilitzem les dates
        if (type === 'updated') {
            const date = new Date(content);
            return `${date.getDay() + 1} / ${date.getMonth()} / ${date.getFullYear()}`
        }

        return content;

    }, []);

    // Es fa servir la taula de MaterialUI amb els títols estàtics
    return (
        <div className={themeClasses.container}>
            <TableContainer>
                <Table stickyHeader sx={{ minWidth: 450 }} role="list">
                    <TableHead>
                        <TableRow>
                            {/* S'itera sobre l'array de títols per crear les cel·les d'aquests */}
                            {orderedTitles.map((value: string, key: number) =>
                                <TableCell
                                    key={key.toString()}
                                    sx={{ textTransform: 'capitalize' }}
                                    align={value === 'name' ? 'left' : 'center'}
                                    role={`${processTitle(value)}-title`}
                                >
                                    {processTitle(value)}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* S'itera sobre l'array de files les cel·les del contingut */}
                        {rows.map((row: Map<string, any>) => (
                            <TableRow
                                key={row.get('id')}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {orderedTitles.map((value: string, key: number) =>
                                    <TableCell
                                        key={key.toString()}
                                        align={value === 'name' ? 'left' : 'center'}
                                    >
                                        {processContent(row.get(value), value)}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

List.propTypes = {
    rows: array.isRequired,
    dataType: string.isRequired,
    users: array.isRequired
}

export default List;
