import { IBase } from "./base.interface";

export interface ILoan extends IBase{
    clientId: string;
    amount: number;
    period: number;
    completed:boolean;
}