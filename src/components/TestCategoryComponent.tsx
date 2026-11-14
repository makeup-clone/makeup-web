import type {ICategory} from "../interfaces/ICategory.ts";
import {useGetCategoriesQuery} from "../services/categoryService.ts";

export const TestCategoryComponent = () => {
    const CategoryItem: React.FC<{ category: ICategory }> = ({ category }) => {
        return (
            <li className="my-1.5">
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#333]">{category.name}</span>
                    <span className="rounded bg-[#f0f0f0] px-1.5 py-0.5 text-xs text-[#666]">
                    slug: {category.urlSlug}
                </span>
                    <span className="text-xs text-[#999]">
                    (Пріоритет: {category.priority})
                </span>
                </div>

                {/* Якщо є діти, рекурсивно виводимо їх у вкладеному списку */}
                {category.children && category.children.length > 0 && (
                    <ul className="mt-1 list-disc border-l-2 border-dashed border-[#ddd] pl-6">
                        {category.children.map((child) => (
                            <CategoryItem key={child.id} category={child} />
                        ))}
                    </ul>
                )}
            </li>
        );
    };

    const CategoryList: React.FC = () => {
        // useGetCategoriesQuery(undefined, {pollingInterval: 5000})
        // При помилці отримання даних, веб додаток буде надсилати повторні запити на сервер в задоному інтервалі (5000 - 5 сек.)
        // Додано як приклад того, як можна получити дані із сервера, якщо той був не запущений.
        // При запуску, веб додаток сам надішле запит на отримання данних, без перезавантаження сторінки, або переадрисації.
        const { data: categories, isLoading, error } = useGetCategoriesQuery(undefined, {pollingInterval: 5000});

        if (isLoading) {
            return <div className="p-5 text-[#666]">Завантаження категорій з бекенду...</div>;
        }

        if (error) {
            return <div className="p-5 text-red-600">Помилка завантаження даних. Перевірте з'єднання з сервером.</div>;
        }

        return (
            <div className="p-6 font-sans">
                <h2 className="mb-4 text-2xl font-bold">Ієрархічний список категорій</h2>
                {(!categories || categories.length === 0) ? (
                    <p>Категорій поки немає в базі даних.</p>
                ) : (
                    <ul className="list-disc pl-5">
                        {categories.map((category) => (
                            <CategoryItem key={category.id} category={category} />
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <>
            <CategoryList/>
        </>
    )
}