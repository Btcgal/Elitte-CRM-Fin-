export const loadFromLocalStorage = (key: string, defaultValue: any) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return defaultValue;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Error loading from local storage", error);
        return defaultValue;
    }
};

export const saveToLocalStorage = (key: string, value: any) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Error saving to local storage", error);
    }
};
