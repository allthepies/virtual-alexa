import { SkillContext } from "../core/SkillContext";
export declare class UserAPI {
    private context;
    constructor(context: SkillContext);
    reset(): void;
    private prepareNockResponse;
    returnsUserProfile(userProfile: IUserProfile): void;
}
export interface IPhoneNumber {
    countryCode: string;
    phoneNumber: string;
}
export interface IUserProfile {
    name?: string;
    givenName?: string;
    email?: string;
    mobileNumber?: IPhoneNumber;
}
