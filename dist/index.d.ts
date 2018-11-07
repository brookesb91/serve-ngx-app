export interface NgxApp {
    /**
     * Path to application directory
     * @example '/dist/my-app'
     */
    path: string;
    /**
     * URL route for this application
     * @example '/'
     * @example '/dashboard'
     * @example '/web-app'
     */
    route: string;
}
export declare class Server {
    ngxApps: NgxApp[];
    port: number;
    constructor(port: number, ngxApps: NgxApp[]);
    start(): void;
}
