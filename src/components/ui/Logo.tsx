import logoSrc from '../../assets/makeup-logo.png'

const Logo = () => {
    return (
        <>
            <div className={"flex justify-start items-center hover:cursor-pointer"}>
                <img src={logoSrc} className={'max-h-14 max-w-[200px]'} alt="logo" />
            </div>
        </>
    )
}

export default Logo;