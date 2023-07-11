import { SkillInteractor } from "./SkillInteractor";
export declare class LocalSkillInteractor extends SkillInteractor {
    private handler;
    constructor(handler: string | ((...args: any[]) => void));
    protected invoke(requestJSON: any): Promise<any>;
}
