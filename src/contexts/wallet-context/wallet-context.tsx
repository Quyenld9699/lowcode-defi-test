'use client';

import { createContext, useContext, useState } from 'react';
import { IContextReturnData } from './types';
import { BaseContextProps, TNet } from 'src/global.config';
import useConnectChain from './hooks/useConnectChain';
import { chainInfo } from 'src/constants/chain-info';

const TheContext = createContext({} as IContextReturnData);

export function WalletProvider({ children }: BaseContextProps) {
    const [typeNet, setTypeNet] = useState<TNet>('mainnet');
    const { data: oraichainData, connect: connectOraichain } = useConnectChain({ chainInfo: chainInfo.oraichain[typeNet] });

    function connectChain() {
        connectOraichain();
    }

    return <TheContext.Provider value={{ typeNet, oraichainData, connectChain }}>{children}</TheContext.Provider>;
}

export const useWalletContext = () => useContext(TheContext);
