const camelizeString = s => {
    // split and uppercase `snake_case`, `kebab-case`, and `spaced keys`
    const updated = s.split(/[-_\s]/)
        .map(s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
        .join('');

    // ensure the final string starts lowercase
    return `${updated.charAt(0).toLowerCase()}${updated.slice(1)}`;
};

export const toCamelCase = (input) => {
    if (typeof input === 'string') return camelizeString(input);
    if (!(input instanceof Object)) return input;  // all other non-string, non-collection types
    if (input instanceof Array) return input.map(value => (typeof value === 'object') ? toCamelCase(value) : value);

    let newObject = {};
    for (let originalKey in input) {
        if (input.hasOwnProperty(originalKey)) {
            const newKey = camelizeString(originalKey);

            // set the value - convert if necessary
            let value = input[originalKey];
            if (value instanceof Array || (value !== null && value.constructor === Object)) {
                value = toCamelCase(value);
            }
            newObject[newKey] = value;
        }
    }

    return newObject;
};

export default toCamelCase;
