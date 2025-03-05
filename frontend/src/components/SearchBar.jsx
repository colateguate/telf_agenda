const SearchBar = ({ searchQuery, setSearchQuery }) => {
    
    const handleSearch = (event) => {
        event.preventDefault()
        setSearchQuery(event.target.value)
    }
    
    return (
        <>
            <input 
                type='text'
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
            />
            
        </>
    )
}

export default SearchBar