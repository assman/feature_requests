import { Injectable } from '@angular/core';
import { Adapter } from './adapter';
import { Feature } from './feature.model';

export class Client {
    constructor(
        public id?: number,
        public name?: string,
        public features?: Feature[]
    ) { }
}
@Injectable({
    providedIn: 'root'
})
export class ClientAdapter implements Adapter<Client> {

    adapt(item: any): Client {
        return new Client(
            item.id,
            item.name,
            item.features
        );
    }
}
