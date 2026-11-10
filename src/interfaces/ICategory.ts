export interface ICategory {
    id: number;
    name: string;
    urlSlug: string;
    priority: number;
    image: string | null;
    description: string | null;
    parentId: number | null;
    children: ICategory[];
}