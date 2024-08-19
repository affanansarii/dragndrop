// src/theme.js
import { extendTheme } from '@chakra-ui/react';

const uniqueTheme = extendTheme({
    colors: {
        purple: {
            50: '#f3e8ff',
            100: '#d9bbff',
            200: '#bf8eff',
            300: '#a661ff',
            400: '#8d34ff',
            500: '#7417e6',
            600: '#5a11b4',
            700: '#400c82',
            800: '#260650',
            900: '#0d0020',
        },
        gray: {
            100: '#f7fafc',
            200: '#edf2f7',
            300: '#e2e8f0',
            400: '#cbd5e0',
            500: '#a0aec0',
            600: '#718096',
            700: '#4a5568',
            800: '#2d3748',
            900: '#1a202c',
        },
    },
    fonts: {
        heading: `'Roboto', sans-serif`,
        body: `'Open Sans', sans-serif`,
    },
    styles: {
        global: {
            body: {
                bg: 'gray.100',
                color: 'gray.800',
            },
        },
    },
});

export default uniqueTheme;
