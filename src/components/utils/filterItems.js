export const filterItems = (items, searchTerm, getKey) => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    return items.filter((item) =>
        getKey(item).toLowerCase().includes(trimmedSearchTerm)
    );
};
