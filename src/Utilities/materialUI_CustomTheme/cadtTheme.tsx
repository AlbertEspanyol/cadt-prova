import {createTheme} from "@mui/material";

/**********************************************************************************
 * Creem un tema propi per customitzar els components del UI Kit de Material UI
 ***********************************************************************************/

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        cadtCustom: true;
    }
}

const CadtTheme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'cadtCustom'},
                    style: {
                        textTransform: 'capitalize',
                        backgroundColor: 'rgba(255,255,255,0.67)',
                        borderRadius: '16px',
                        color: 'black',
                        fontSize: '20px',
                        fontWeight: '800',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: 'rgba(0,0,0,1)',
                            color: 'white'
                        }
                    }
                }
            ]
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: 'black',
                    transition: 'opacity 500ms cubic-bezier(.57,0,.45,1)',
                    '&:hover': {
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        transition: 'border-radius 200ms'
                    }
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    marginBottom: '8px',
                    color: 'black',
                    fontSize: '16px',
                    fontWeight: '500',
                    maxWidth: '200px',
                    '&:hover': {
                        transition: 'background-color 200ms',
                        backgroundColor: 'rgba(255,255,255,0.3)'
                    }
                }
            }
        },
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    maxHeight: '400px'
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'unset'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontWeight: 'unset',
                    fontFamily: '"Poppins", sans-serif'
                },
                h2: {
                    textTransform: 'capitalize',
                    fontWeight: '600',
                    letterSpacing: '2px'
                }
            }
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: '50px 50px',
                    margin: '0',
                    display: 'flex',
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    width: '100%',
                    transition: 'width 700ms cubic-bezier(.57,0,.45,1), opacity 200ms cubic-bezier(.57,0,.45,1), padding 700ms cubic-bezier(.57,0,.45,1), height 700ms cubic-bezier(.57,0,.45,1)',
                    '@media (min-width: 600px)': {
                        padding: '50px 50px'
                    },
                    '&.slide': {
                        width: '0',
                        opacity: '0',
                        padding: '0'
                    },
                    '@media (max-width: 1080px)': {
                        '&.slide':{
                            height: '0',
                            opacity: '0',
                            width: '100%',
                            padding: '0'
                        }
                    }
                }
            }
        },
        MuiCircularProgress: {
            styleOverrides:{
                root:{
                    color: 'black',
                    backgroundColor: 'black',
                    borderRadius: '8px'
                }
            }
        }
    }
});

export default CadtTheme;