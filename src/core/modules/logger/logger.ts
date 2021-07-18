export class Logger {
    constructor() {}

    logInfo(msg: string, ...params: any[]): void {
        console.log(this.msgParams(msg, params));
    }

    private msgParams(msg: string, params: any[]): string {
        params.forEach((param) => {
            msg += ' ' + param;
        });
        return msg;
    }
}
