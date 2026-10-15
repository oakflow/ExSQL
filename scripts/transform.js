// This script transforms excel data into SQL format

(
    async () => {
        
        const input = document.getElementById("file");
        const directInput = document.getElementById("fileInsert").value;

        const file = input.files?.[0];

        const columns = document.getElementById("structureInput").value.replaceAll(' ', '');
        const format = document.getElementById("format").value;
        const sqlFormat = document.getElementById("sqlFormat").value;
        

        if (!file && !directInput) {
            console.log('Missing File.')
        } else if (file && directInput) { 
            console.log('Choose a file OR direct insertion, not both.')
        } else {
            
            const buffer = directInput || await file.text();
            const data = parseRows(buffer); // Excel rows or SQL tuples, already split into cells

            const sqlValue = v => (v === '' || v === undefined)
                                    ? 'NULL'
                                    : `'${v.replaceAll("'", "''")}'`; // escapes value only, not wrapping quotes

            let rows;

            if (columns == '') {

                rows = data
                            .map(cols => {

                                return cols;
                            })

            }
            else {
                rows = data
                            .map(cols => {

                                let arr;

                                arr = columns.split(',').map(Number);

                                return arr.map(n => cols[n - 1]);
                            })
            }

            let output;

            if (format == 'Excel') {
                output = rows.map(r => r.map(v => v ?? '').join('\t')).join('\n');
            } else if (sqlFormat == 'in') {
                output = `(${rows.flat().map(sqlValue).join(',\n')})`;
            } else {
                output = rows.map(r => `(${r.map(sqlValue).join(', ')})`).join(',\n');
            }

            console.log(output);
            navigator.clipboard.writeText(output);
            console.log("Output copied to clipboard.");
        }
    }
)

(
);