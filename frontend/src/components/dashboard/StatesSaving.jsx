import React from 'react';

function StatesSaving(objectToSave) {
    if (objectToSave) {
        try {
            // Convert object to JSON string and save to local storage
            localStorage.setItem('savedObject', JSON.stringify(objectToSave));

        } catch (error) {
            console.error('Error saving object to local storage:', error);
        }
    }
}
function StateLoading() {
    //fetching the object  from key name set as "savedObject" during StatesSaving
    const savedItem = localStorage.getItem('savedObject');
    if (savedItem) {
        try {
            const parsedObject = JSON.parse(savedItem);
            return parsedObject

        } catch (error) {
            console.error('Error parsing object from local storage:', error);
        }
    }
}
export { StateLoading, StatesSaving }