const SearchBar = () => {
    return (
        <>
            <div className="w-full max-w-md">
                <input
                    type="text"
                    placeholder="Пошук..."
                    className="w-full px-5 py-1 text-sm bg-transparent border border-gray-400 rounded-full focus:outline-none focus:ring-2  focus:ring-gray-300 focus:border-transparent transition-all"
                />
            </div>
        </>
    )
}

export default SearchBar;