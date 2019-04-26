//helper functions goes here
export function formatMoney(pennies){
    pennies = parseInt(pennies);
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

export function formatDate(datetime){
    let date = datetime.split(' ')[0];
    let day = new Date(date);
    day = day.getDay();
    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    day = dayOfWeek[day];
    date = date.split('/');
    let month = parseInt(date[0]);
    const monthName = ['',
        'Jan', 'Feb', 'Mar',
        'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec'
    ];
    month = monthName[month];
    return `${day} ${month} ${date[1]}, ${date[2]}`;
}

export function formatDatetime(datetime){
    const dt = new Date(datetime);

    return `${dt.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'numeric',
        day: 'numeric'
    })} ${dt.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
    })}`;
}

export function loadScript(url){
    const index = window.document.getElementsByTagName("script")[0];
    const script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
}