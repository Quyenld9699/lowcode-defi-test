'use client';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { Decimal } from '@cosmjs/math';
import { ChainInfo, OfflineAminoSigner } from '@keplr-wallet/types';
import { useEffect, useState } from 'react';
import useNotifier from 'src/hooks/useNotifier';
import { BN } from 'src/utils';
import { IDataChainConnected } from '../types';

type Props = {
    chainInfo: ChainInfo;
};

export default function useConnectChain({ chainInfo }: Props) {
    const [connecting, setConnecting] = useState<boolean>(false);
    const { notifyError, notifyWarn, notifySuccess } = useNotifier();
    const [data, setData] = useState<IDataChainConnected>({ address: '', userClient: null, baseDivident: BN(0) });

    const [error, setError] = useState<Error | undefined>();

    async function connect() {
        setConnecting(true);
        // console.log('connect_keplr');
        if (!window.keplr) {
            notifyWarn('You must install Keplr to continue');
        } else {
            try {
                try {
                    await window.keplr.enable(chainInfo.chainId);
                } catch (err) {
                    // console.log((err as Error).message);
                    if ((err as Error).message == 'Request rejected') {
                        localStorage.setItem('isConnected', 'no');
                        throw Error('Request rejected');
                    } else {
                        await window.keplr.experimentalSuggestChain(chainInfo);
                    }
                }

                const offlineSigner = window.keplr.getOfflineSignerOnlyAmino(chainInfo.chainId);
                const accounts = await offlineSigner.getAccounts();

                const coswasmStageGate = await SigningCosmWasmClient.connectWithSigner(chainInfo.rpc, offlineSigner as OfflineAminoSigner, {
                    gasPrice: { amount: Decimal.fromUserInput('0', 0), denom: chainInfo.currencies[0].coinDenom },
                });

                setData((prev) => {
                    return {
                        ...prev,
                        address: accounts[0].address,
                        userClient: coswasmStageGate,
                        baseDivident: BN(10).pow(chainInfo.stakeCurrency.coinDecimals),
                    };
                });
                notifySuccess('Successfully connected with address: ' + accounts[0].address);

                localStorage.setItem('isConnected', 'yes');
            } catch (err) {
                console.log(err as Error);
                notifyError((err as Error).message);
                setError(err as Error);
            }
        }
        setConnecting(false);
    }

    useEffect(() => {
        // connectNonUserClient();
        window.addEventListener('keplr_keystorechange', () => {
            if (localStorage.getItem('isConnected') == 'yes') {
                connect();
            }
        });
        if (localStorage.getItem('isConnected') == 'yes') {
            setTimeout(() => {
                connect();
            }, 550);
        }
    }, []);
    return {
        connecting,
        data,
        error,
        connect,
    };
}
