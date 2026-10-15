function formatter(parsed, formatVal, sqlFormat){
    if (formatVal === 'SQL') {
        return formatSQL(parsed, sqlFormat)
    } else {
        return formatExcel(parsed)
    }
}

function formatSQL(parsed, sqlFormat) {
    if (sqlFormat === 'in') {
        return `(${parsed.map(id => `'${id}'`).join(',\n')})`
    } else {
        return `${parsed.map(id => 
                `(${(id.split('\t')).map(per => 
                 per.trim() === '' ? 
                            'NULL' :    
                            `'${per.trim()
                                   .replaceAll("'", "''")}'`)
                                   .join(', ')})`)
                                   .join(',\n')}`
        }
}

function formatExcel(parsed) {
    return parsed.join('\n')
}