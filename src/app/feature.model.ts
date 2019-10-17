import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class Feature {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public client?: number,
        public priority?: number,
        public product_area?: string,
        public target_date?: Date,
    ) { }
}
@Injectable({
    providedIn: 'root'
})
export class FeatureAdapter implements Adapter<Feature> {

    adapt(item: any): Feature {
        return new Feature(
            item.id,
            item.title,
            item.description,
            item.client,
            item.priority,
            item.product_area,
            new Date(item.target_date),
        );
    }
}
