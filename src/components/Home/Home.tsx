'use client';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useWalletContext } from 'src/contexts/wallet-context/wallet-context';
import useNotifier from 'src/hooks/useNotifier';

export default function Home() {
    const { notifySuccess } = useNotifier();
    const { typeNet, oraichainData, connectChain } = useWalletContext();
    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'}>
                <Typography variant="h3">{typeNet}</Typography>
                <Button variant="gradient" onClick={connectChain}>
                    Connect wallet
                </Button>
            </Box>
            <Button variant="contained" onClick={() => notifySuccess('Em chao anh Quyen')}>
                Click
            </Button>
            <Typography textAlign={'center'}>{oraichainData.address}</Typography>
        </Box>
    );
}
