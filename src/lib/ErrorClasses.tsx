export class NotConnectWallet extends Error {
    constructor() {
        super('You have not connect your wallet yet!');
    }
}
