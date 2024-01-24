import { IBase } from "./base.interface";

export interface IClient extends IBase{
    name:string;
    mobile: string;
    bank: string;
}