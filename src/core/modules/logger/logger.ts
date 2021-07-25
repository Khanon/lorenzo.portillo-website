export class Logger {
    constructor() {}

    static info(msg: string, ...params: any[]): void {
        console.log(this.msgParams(msg, params));
    }

    static error(msg: string, ...params: any[]): void {
        console.log('Error - ' + this.msgParams(msg, params));
    }

    private static msgParams(msg: string, params: any[]): string {
        params.forEach((param) => {
            msg += ' ' + param;
        });
        return msg;
    }
}
