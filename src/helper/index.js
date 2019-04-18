//helper functions goes here
export function formatMoney(pennies){
    pennies = parseFloat(pennies);
    if(isNaN(pennies)){
        return '-';
    }
    const dollars = (pennies/100).toFixed(2);
    return `$ ${dollars}`;
}

export function formatEntries(text){
    let firstChar = text.charAt(0)
    if(typeof firstChar === 'string'){
        firstChar = firstChar.toUpperCase();
        return firstChar + text.slice(1);
    }
    return text;
}
