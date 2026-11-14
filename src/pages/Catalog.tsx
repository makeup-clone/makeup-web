import {TestCategoryComponent} from "../components/TestCategoryComponent.tsx";

const Catalog = () => {
    return (
        <>
            <h1 className={"text-center py-5 text-xl"}>Каталог</h1>
            <TestCategoryComponent/>
        </>
    )
}

export default Catalog;