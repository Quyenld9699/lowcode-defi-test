import BigNumber from 'bignumber.js';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Build exact url to resource in public folder
 * @param pathToPublicResource The path to the resource in public folder
 * @returns A string represents an url to resource
 */
export function buildPathToPublicResource(pathToPublicResource: string): string {
    if (pathToPublicResource[0] === '/') pathToPublicResource = pathToPublicResource.slice(1);
    return `${process.env.PUBLIC_URL}/${pathToPublicResource}`;
}

export function isNumeric(num: any) {
    return !isNaN(num) && !isNaN(parseFloat(num));
}

/**
 * Cast a value to BigNumber instance.
 * @param value - The value
 * @returns An instance of BigNumber or NaN if value isn't a valid number.
 */
export function BN(value: any): BigNumber {
    return new BigNumber(value);
}

export function getErrorMessage(error: any): string | undefined {
    return error ? error.reason ?? error.message : undefined;
}

export function handleError(error: any, notify?: (msg: string) => void) {
    const msg = getErrorMessage(error);
    if (msg && typeof notify === 'function') {
        notify(msg);
    }
}

export function toUSD(amount?: string | number, price?: string | number): string {
    return BN(amount).times(BN(price)).toString();
}

export function toAPY(apr: string | number): string {
    const bigNumberApr = BN(apr);
    if (bigNumberApr.isGreaterThan(100)) {
        return bigNumberApr.toString();
    }
    if (bigNumberApr.isLessThan(0)) {
        const _n = BN(1).plus(bigNumberApr.abs().div(BN(513131700))); // 5131317 = blockPerYear * 100 //  apr la dang %
        if (_n.isGreaterThan(5000)) {
            return 'Infinity';
        }
        return (
            '-' +
            BN(Math.pow(_n.toNumber(), 5131317) - 1)
                .times(100)
                .toString()
        );
    } else {
        const _n = BN(1).plus(bigNumberApr.div(BN(513131700))); // 5131317 = blockPerYear * 100 //  apr la dang %
        if (_n.isGreaterThan(5000)) {
            return 'Infinity';
        }
        return BN(Math.pow(_n.toNumber(), 5131317) - 1)
            .times(100)
            .toString();
    }
}

export function copyTextToClipboard(text: string) {
    navigator.clipboard.writeText(text);
}