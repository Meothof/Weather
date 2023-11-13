import { ICoordinates } from './coordinates';

export interface IPlace {
    id: number;
    name: string;
    coordinates: ICoordinates;
    order?: number;
}
