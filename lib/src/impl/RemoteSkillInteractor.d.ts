import { SkillInteractor } from "./SkillInteractor";
export declare class RemoteSkillInteractor extends SkillInteractor {
    private urlString;
    constructor(urlString: string);
    protected invoke(requestJSON: any): Promise<any>;
}
