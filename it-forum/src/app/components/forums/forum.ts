export interface Forum {
    id: number;
    name: string;
    categories: Category[];
}

export interface Category {
    id: number;
    name: string;
    threadsCount: number;
}
