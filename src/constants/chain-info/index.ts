import { ChainInfo } from '@keplr-wallet/types';
import { TNet } from 'src/global.config';

export type TChainConnect = 'oraichain';

export const chainInfo: { [key in TChainConnect]: { [key in TNet]: ChainInfo } } = {
    oraichain: {
        mainnet: {
            chainId: 'Oraichain',
            chainName: 'Oraichain',
            rpc: 'https://rpc.orai.io',
            // rpc: 'https://app.vchain.zone/gateway/endpoint/oraichain/rpc',
            rest: 'https://lcd.orai.io',
            // rest: 'https://app.vchain.zone/gateway/endpoint/oraichain/rest',
            bip44: {
                coinType: 118,
            },
            bech32Config: {
                bech32PrefixAccAddr: 'orai',
                bech32PrefixAccPub: 'orai' + 'pub',
                bech32PrefixValAddr: 'orai' + 'valoper',
                bech32PrefixValPub: 'orai' + 'valoperpub',
                bech32PrefixConsAddr: 'orai' + 'valcons',
                bech32PrefixConsPub: 'orai' + 'valconspub',
            },
            currencies: [
                {
                    coinDenom: 'ORAI',
                    coinMinimalDenom: 'orai',
                    coinDecimals: 6,
                    coinGeckoId: 'oraichain-token',
                },
            ],
            feeCurrencies: [
                {
                    coinDenom: 'ORAI',
                    coinMinimalDenom: 'orai',
                    coinDecimals: 6,
                    coinGeckoId: 'oraichain-token',
                },
            ],
            stakeCurrency: {
                coinDenom: 'ORAI',
                coinMinimalDenom: 'orai',
                coinDecimals: 6,
                coinGeckoId: 'oraichain-token',
            },
            coinType: 118,
        },
        testnet: {
            chainId: 'Oraichain-testnet',
            chainName: 'Orai Test',
            rpc: 'https://testnet-rpc.orai.io',
            rest: 'https://testnet-lcd.orai.io',
            bip44: {
                coinType: 118,
            },
            bech32Config: {
                bech32PrefixAccAddr: 'orai',
                bech32PrefixAccPub: 'orai' + 'pub',
                bech32PrefixValAddr: 'orai' + 'valoper',
                bech32PrefixValPub: 'orai' + 'valoperpub',
                bech32PrefixConsAddr: 'orai' + 'valcons',
                bech32PrefixConsPub: 'orai' + 'valconspub',
            },
            currencies: [
                {
                    coinDenom: 'ORAI',
                    coinMinimalDenom: 'orai',
                    coinDecimals: 6,
                    coinGeckoId: 'oraichain-token',
                },
            ],
            feeCurrencies: [
                {
                    coinDenom: 'ORAI',
                    coinMinimalDenom: 'orai',
                    coinDecimals: 6,
                    coinGeckoId: 'oraichain-token',
                },
            ],
            stakeCurrency: {
                coinDenom: 'ORAI',
                coinMinimalDenom: 'orai',
                coinDecimals: 6,
                coinGeckoId: 'oraichain-token',
            },
            coinType: 118,
        },
    },
};
