import { Media } from './media.model';

export class Category {
    id: number;
    name: string;
    description: string;
    image: Media;
    categories: Category[];
    
    /**
     * Constructor
     *
     * @param contact
     */
    constructor(category)
    {
        {
            this.id = category.id;
            this.name = category.name || '';
            this.description = category.description || '';
            this.image = category.image;
            this.categories = category.categories || '';
        }
    }
}
