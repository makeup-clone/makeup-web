import logoSrc from '../../assets/untouched-logo.svg'
import {Link} from "react-router";

const Logo = () => {
    return (
        <>
            <div className={"flex justify-start items-center hover:cursor-pointer"}>
                <Link to={"/"}>
                    <img src={logoSrc} className={'max-h-14 max-w-50 select-none'} draggable={false} alt="logo" />
                </Link>
            </div>
        </>
    )
}

export default Logo;