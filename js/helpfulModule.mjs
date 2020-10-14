const HelpfulFunctions = (function() {

    const formatDate = (dateStr) => {

        let dateArray = dateStr.split('-')
        let str = `${dateArray[1]}/${dateArray[2]}/${dateArray[0]}`;
        return str;
        
    }

    const getCurrentDate = () => {
        const o_date = new Intl.DateTimeFormat
        const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value})
        const m_date = o_date.formatToParts().reduce(f_date, {})
        const date = (`${m_date.year}-${m_date.month}-${m_date.day}`)
        return date;
    }

    return {
        formatDate: formatDate,
        getCurrentDate: getCurrentDate,
    }

})();