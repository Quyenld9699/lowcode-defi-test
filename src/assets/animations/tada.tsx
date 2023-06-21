import { keyframes } from '@emotion/react';

const aniamation = keyframes({
    '0%': {
        transform: 'scale(1)',
    },
    '10%, 20%': {
        transform: 'scale(0.9) rotate(-3deg)',
    },
    '30%, 50%, 70%, 90%': {
        transform: 'scale(1.1) rotate(3deg)',
    },
    '40%, 60%, 80%': {
        transform: 'scale(1.1) rotate(-3deg)',
    },
    '100%': {
        transform: 'scale(1) rotate(0)',
    },
});

export const tadaAnimation = `${aniamation} 2s infinite`;
