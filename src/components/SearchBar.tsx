export const SearchBar = () => {
    return (
        <div>
            <form>
                <label htmlFor="searchbar"></label>
                <input
                    type="text"
                    id="searchbar"
                    name="searchbar"
                    className=""
                />
                <button type="submit" hidden></button>
                <div>
                    <button>Clear</button>
                </div>
            </form>
        </div>
    );
};
