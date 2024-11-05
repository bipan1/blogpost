export const formatDate = (dateString: Date) => { 
    const date = new Date(dateString); 
    return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date); 
};