import './App.css'
import type {ICategory} from "./interfaces/ICategory.ts";
import {useGetCategoriesQuery} from "./services/categoryService.ts";

function App() {

    const CategoryItem: React.FC<{ category: ICategory }> = ({ category }) => {
        return (
            <li style={{ margin: '6px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#333' }}>{category.name}</span>
                    <span style={{ fontSize: '12px', color: '#666', background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>
                    slug: {category.urlSlug}
                </span>
                    <span style={{ fontSize: '12px', color: '#999' }}>
                    (Пріоритет: {category.priority})
                </span>
                </div>

                {/* Якщо є діти, рекурсивно виводимо їх у вкладеному списку */}
                {category.children && category.children.length > 0 && (
                    <ul style={{ paddingLeft: '24px', borderLeft: '2px dashed #ddd', marginTop: '4px' }}>
                        {category.children.map((child) => (
                            <CategoryItem key={child.id} category={child} />
                        ))}
                    </ul>
                )}
            </li>
        );
    };

    const CategoryList: React.FC = () => {
        // Викликаємо ваш RTK Query хук
        const { data: categories, isLoading, error } = useGetCategoriesQuery();

        if (isLoading) {
            return <div style={{ padding: '20px', color: '#666' }}>Завантаження категорій з бекенду...</div>;
        }

        if (error) {
            return <div style={{ padding: '20px', color: 'red' }}>Помилка завантаження даних. Перевірте з'єднання з сервером.</div>;
        }

        return (
            <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
                <h2>Ієрархічний список категорій</h2>
                {(!categories || categories.length === 0) ? (
                    <p>Категорій поки немає в базі даних.</p>
                ) : (
                    <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
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

export default App
