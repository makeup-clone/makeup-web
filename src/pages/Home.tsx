import {TestCategoryComponent} from "../components/TestCategoryComponent.tsx";
import TestFont from "../components/TestFont.tsx";

const Home = () => {
    return (
        <>
            <h1 className={"text-center py-5 text-xl"}>Головна сторінка</h1>
            <TestCategoryComponent/>
            <TestFont/>
        </>
    )
}

export default Home;