import { IBase } from "./base.interface";

export interface IInterest extends IBase{
    clientId: string;
    amount: number;
    month: number;
    paid: boolean;
}