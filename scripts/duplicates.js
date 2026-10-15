(
    async () => {
        
        const input = document.getElementById("file");
        const directInput = document.getElementById("fileInsert").value;
        
        const file = input.files?.[0];

        const format = document.getElementById("format").value;
        const sqlFormat = document.getElementById("sqlFormat").value;

        if (!file && !directInput) {
            console.log('Missing File.');
        } else if (file && directInput) { 
            console.log('Choose a file OR direct insertion, not both.');
        } else {

            const buffer = directInput || await file.text();
            let data = parseData(buffer);
        
            const seen = new Set();
            let duplicates = new Set();

            data
                .map(entry => entry.trim())
                .forEach(entry => {
                    if (seen.has(entry)) {
                        duplicates.add(entry);
                    } else {
                        seen.add(entry);
                    }
                });


            const output = formatter([...duplicates], format, sqlFormat);


            if (duplicates.size === 0) {
                console.log("No duplicates found.");
            } else {
                console.log(output);
                navigator.clipboard.writeText(output);
                console.log("Duplicates copied to clipboard.");
            };
        };
    }
)

(
);