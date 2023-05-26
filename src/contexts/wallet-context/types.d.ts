import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import BigNumber from 'bignumber.js';
import { TNet } from 'src/global.config';

export interface IDataChainConnected {
    address: string;
    userClient: SigningCosmWasmClient | null;
    baseDivident: BigNumber;
}

export interface IContextReturnData {
    typeNet: TNet;
    oraichainData: IDataChainConnected;
    connectChain: () => void;
}
