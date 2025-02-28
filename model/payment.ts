export class Payment {
    paymentId: string;
    appointmentId: string;
    paymentDate: Date;
    amount: number; // cash,card,online

    constructor(paymentId: string, appointmentId: string, paymentDate: Date, amount: number) {
        this.paymentId = paymentId;
        this.appointmentId = appointmentId;
        this.paymentDate = paymentDate;
        this.amount = amount;
    }

}