// brief description

(
    async () => {

        const input = document.getElementById("file");
        const directInput = document.getElementById("fileInsert").value;

        // const capture = document.getElementById("yourInputField").value; // if the tool needs extra input

        const file = input.files?.[0];

        const format = document.getElementById("format").value;
        const sqlFormat = document.getElementById("sqlFormat").value;

        if (!file && !directInput) {
            console.log('Missing File.');
        } else if (file && directInput) {
            console.log('Choose a file OR direct insertion, not both.');
        } else {

            const buffer = directInput || await file.text();
            const data = parseData(buffer); // list of values, use parseRows(buffer) for rows of cells, or buffer for raw text

            const result = data; // your logic here

            const output = formatter(result, format, sqlFormat);

            if (result.length === 0) {
                console.log("Nothing found.");
            } else {
                console.log(output);
                navigator.clipboard.writeText(output);
                console.log("Output copied to clipboard.");
            };
        };
    }
)

(
);