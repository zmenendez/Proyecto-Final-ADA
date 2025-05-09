import { useState, useEffect } from 'react';

// Hook personalizado para sincronizar un estado de React con localStorage
function useLocalStorage(key, initialValue) {
    // Crea un estado inicial leyendo del localStorage (solo se ejecuta una vez!!!!!)
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Intenta obtener el valor almacenado usando la clave proporcionada
            const item = window.localStorage.getItem(key);
            // Si existe, lo parsea de JSON a objeto y lo usa como valor inicial
            // Si no existe, usa el valor inicial proporcionado
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // En caso de error (por ejemplo, JSON malformado), retorna el valor inicial
            console.error(error);
            return initialValue;
        }
    });

    // Cada vez que storedValue o key cambian, actualiza el valor en localStorage
    useEffect(() => {
        try {
            // Convierte el valor actual del estado a JSON y lo guarda en localStorage
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error); // Muestra error si no puede guardar en localStorage
        }
    }, [key, storedValue]); // Se ejecuta cuando cambia la clave o el valor

    // Retorna el valor almacenado y la función para actualizarlo
    return [storedValue, setStoredValue];
}

export default useLocalStorage;
