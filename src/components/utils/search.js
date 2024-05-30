export const filterItems = (items, searchTerm, getKey) => {
    return items.filter((item) =>
        getKey(item).toLowerCase().includes(searchTerm.toLowerCase())
    );
};
