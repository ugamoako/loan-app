import { IBase } from "./base.interface";

export interface ILoanPayment extends IBase{
    loanId: string;
    amount: number;
}