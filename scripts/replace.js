// This script replaces a certain character/string with another

(
    async () => {

        const input = document.getElementById("file");
        const directInput = document.getElementById("fileInsert").value;

        const file = input.files?.[0];

        const oldCh = document.getElementById("oldInput").value;
        const newCh = document.getElementById("newInput").value;

        if (!file && !directInput) {
            console.log('Missing File.')
        } else if (file && directInput) { 
            console.log('Choose a file OR direct insertion, not both.')
        } else {
            const data = directInput || await file.text();
            const list = replace(oldCh, newCh, data) 

            console.log(list);
            navigator.clipboard.writeText(list);
            console.log("Replaced version copied to clipboard.")
        };
    }
)

(
);