import {TestCategoryComponent} from "../components/TestCategoryComponent.tsx";

const Home = () => {
    return (
        <>
            <h1 className={"text-center py-5 text-xl"}>Головна сторінка</h1>
            <TestCategoryComponent/>
        </>
    )
}

export default Home;