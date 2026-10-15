// This script filters given data, regardless of it being in Excel or SQL formatd

(
    async () => {

        const input = document.getElementById("file");
        const directInput = document.getElementById("fileInsert").value;

        const capture = document.getElementById("filterInput").value;
        const colNoInput = document.getElementById("columnNoInput");
        const colNo = colNoInput.hidden ? '' : colNoInput.value; // ignore a leftover value when the field is hidden (IN mode)

        const file = input.files?.[0];

        const format = document.getElementById("format").value;
        const sqlFormat = document.getElementById("sqlFormat").value;
        
        if (!file && !directInput) {
            console.log('Missing File.')
        } else if (file && directInput) { 
            console.log('Choose a file OR direct insertion, not both.')
        } else {

            const buffer = directInput || await file.text();
            const data = colNo
                ? parseRows(buffer).map(row => row.join('\t')) // whole rows (Excel or SQL), so empty cells and commas don't shift columns
                : parseData(buffer);
 
            const except = parseData(capture);
            // console.log("Excepting:\n", except);
            const removeIDs = new Set(except);
            // console.log(removeIDs)

            let filtered;
            if (colNo) {
                filtered = data.filter(row => {
                    const columns = row.split("\t");
                    const id = columns[colNo - 1]?.trim();

                    return !removeIDs.has(id);
                })
            } else {
                filtered = data.filter(id => !removeIDs.has(id));
            }

            const output = formatter(filtered, format, sqlFormat);

            if (filtered.length === 0) {
                console.log("File/Data is fully excepted.")
            } else if (filtered.length === data.length) {
                console.log("File/Data has nothing to except.")
            } else {
                console.log(output);
                navigator.clipboard.writeText(output);
                console.log("Filtered data copied to clipboard.")
                
            }
        }
    }
)

(
);