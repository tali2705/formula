import { ChangeEvent } from 'react';

export const filterItems = <T,>(
    items: T[],
    searchTerm: string,
    getKey: (item: T) => string
): T[] => {
    const trimmedSearchTerm: string = searchTerm.trim().toLowerCase();

    return items.filter((item) =>
        getKey(item).toLowerCase().includes(trimmedSearchTerm)
    );
};

export const onSearchChange =
    (setSearchField: React.Dispatch<React.SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
        setSearchField(event.target.value.toLowerCase());
    };
