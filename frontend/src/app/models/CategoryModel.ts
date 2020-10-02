import {MediaModel} from './MediaModel';

export class CategoryModel {
    id: number;
    name: string;
    description: string;
    image: MediaModel;
    categories: CategoryModel[];
}
