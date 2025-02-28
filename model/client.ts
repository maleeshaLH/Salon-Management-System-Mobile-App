export class Client {
    clientName: string;
    clientEmail: string;
    clientPhone: number;
    clientPassword:string

    constructor( clientName: string, clientEmail: string, clientPhone: number
    ,clientPassword:string) {

        this.clientName = clientName;
        this.clientEmail = clientEmail;
        this.clientPhone = clientPhone;
        this.clientPassword = clientPassword;
    }

}