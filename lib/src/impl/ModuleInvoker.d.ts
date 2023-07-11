export declare class ModuleInvoker {
    static invokeHandler(handler: string, event: any): Promise<any>;
    static invokeFunction(lambdaFunction: (...args: any[]) => any, event: any): Promise<any>;
}
