(
    async () => {

        const input = document.getElementById("file");
        const directInput = document.getElementById("fileInsert").value;

        let capture = document.getElementById("matchInput").value;

        const file = input.files?.[0];

        const format = document.getElementById("format").value;
        const sqlFormat = document.getElementById("sqlFormat").value;

        if (!file && !directInput) {
            console.log('Missing File.');
        } else if (file && directInput) {
            console.log('Choose a file OR direct insertion, not both.');
        } else if (!capture.trim()) {
            console.log('Nothing to match against.');
        } else {

            const data = (directInput) || (await file.text());

            const onlyInData = filter(data, capture);
            const onlyInMatcher = filter(capture, data);

            const matchOne = formatter(onlyInData, format, sqlFormat);
            const matchTwo = formatter(onlyInMatcher, format, sqlFormat);


            if (onlyInData.length === 0 && onlyInMatcher.length === 0) {
                console.log('No mismatch found.');

            } else if (onlyInData.length === 0) {
                console.log('File/Inserted Data does not contain any exclusives.\n');
                console.log('Matcher input exclusives:', `\n${matchTwo}`);

                navigator.clipboard.writeText(matchTwo);
                console.log("Matcher exclusives copied to clipboard.");

            } else if (onlyInMatcher.length === 0) {
                console.log('File/Inserted Data exclusives:', `\n${matchOne}`);
                console.log('Matcher input does not contain any exclusives.');

                navigator.clipboard.writeText(matchOne);
                console.log("File/Inserted Data exclusives copied to clipboard.");

            } else {
                console.log('File/Inserted Data exclusives:', `\n${matchOne}`);
                console.log('Matcher input exclusives:', `\n${matchTwo}`);

                navigator.clipboard.writeText(`File/Inserted Data exclusives:\n${matchOne}\nMatcher input exclusives:\n${matchTwo}`);
                console.log("Output copied to clipboard.");
            }
        };
    }
)

(
);

// returns the entries of x that are not in y
function filter(x, y) {
    const removeIDs = new Set(parseData(y));
    return parseData(x).filter(id => !removeIDs.has(id));
}
