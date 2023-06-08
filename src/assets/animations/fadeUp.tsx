import { keyframes } from '@emotion/react';

const fadeUp = keyframes({
    '0%': {
        opacity: 0,
        transform: 'translate(0px,100px)',
    },
    '100%': {
        opacity: 1,
        transform: 'translate(0px,0px)',
    },
});

export const fadeUpAnimation = `${fadeUp} 0.25s both`;
