export class Service {
    serviceId: string;
    name: string;
    duration: string;
    price: number; // cash,card,online

    constructor(serviceId: string, name: string, duration: string, price: number) {
        this.serviceId = serviceId;
        this.name = name;
        this.duration = duration;
        this.price = price;
    }

}