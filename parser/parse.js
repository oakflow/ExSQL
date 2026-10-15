// parser
function parseData(data) {
    if (isSQL(data) || data.includes('\t')) {
        return parseRows(data).map(row => row.join('\t')).filter(Boolean) // sql tuples or excel rows, keeps multi column rows together
    }

    return data.replaceAll('(', '')
               .replaceAll(')', '')
               .split(/[,\r\n]+/)
               .filter(id => id.trim().toUpperCase() !== 'NULL') // unquoted NULL = no value
               .map(id => id.replaceAll("'", '').trim())
               .filter(Boolean)
}

// true for pasted sql tuples, e.g., ('a', 'b'),\n('c', NULL) or ('1001',\n'1002')
function isSQL(data) {
    const text = data.trim();
    return text.startsWith('(') && /\)\s*[,;]?$/.test(text);
}

// turns excel rows or sql tuples into rows of cells, NULL becomes an empty cell
function parseRows(data) {
    if (!isSQL(data)) {
        return data.split(/\r?\n/)
                   .filter(line => line.trim() !== '')
                   .map(line => line.split('\t')
                                    .map(cell => cell.trim())
                                    .map(cell => cell.toUpperCase() === 'NULL' ? '' : cell));
    }

    const tuples = [];
    let row = null; // cells of the tuple being read, null when between tuples
    let cell = '';
    let quoted = false; // if current cell written in quotes
    let inQuote = false;

    const endCell = () => {
        const value = quoted ? cell : cell.trim();
        row.push(!quoted && value.toUpperCase() === 'NULL' ? '' : value);
        cell = '';
        quoted = false;
    };

    for (let i = 0; i < data.length; i++) {
        const ch = data[i];

        if (inQuote) {
            if (ch === "'" && data[i + 1] === "'") { cell += "'"; i++; } // '' is an escaped quote
            else if (ch === "'") { inQuote = false; }
            else { cell += ch; }
        } else if (row === null) {
            if (ch === '(') { row = []; } // text between tuples is ignored
        } else if (ch === "'") {
            inQuote = true;
            quoted = true;
            cell = '';
        } else if (ch === ',') {
            endCell();
        } else if (ch === ')') {
            endCell();
            tuples.push(row);
            row = null;
        } else if (!quoted) {
            cell += ch; // unquoted values, e.g., numbers or NULL
        }
    }

    // a single tuple is an IN list (one value per row), several tuples are VALUES rows
    return tuples.length === 1 ? tuples[0].map(value => [value]) : tuples;
}

