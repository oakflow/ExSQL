(
    async () => {
        
        const input = document.getElementById("file");
        const directInput = document.getElementById("fileInsert").value;

        const capture = document.getElementById("countInput").value;

        
        const file = input.files?.[0];

        if (!file && !directInput) {
            console.log('Missing File.')
        } else if (file && directInput) { 
            console.log('Choose a file OR direct insertion, not both.')
        } else if (!capture) {
            console.log('Nothing to count.')
        } else {
            const data = (directInput) || (await file.text());

            // literal match, case-insensitive
            const count = data.toLowerCase().split(capture.toLowerCase()).length - 1;

            console.log(`${count} occurrences.`);

            navigator.clipboard.writeText(String(count));
            console.log("Count copied to clipboard.")
        };
    }
)

(
);
