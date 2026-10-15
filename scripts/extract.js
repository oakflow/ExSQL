// This script extracts certain data which shares a given prefix

(
    async () => {

        const input = document.getElementById("file");
        const directInput = document.getElementById("fileInsert").value;

        const file = input.files?.[0];

        const capture = document.getElementById("extractInput").value ;
        const regExFlag = document.getElementById("extractBool").value === "regex";

        const format = document.getElementById("format").value;
        const sqlFormat = document.getElementById("sqlFormat").value;

        if (!file && !directInput) {
            console.log('Missing File.')
        } else if (file && directInput) { 
            console.log('Choose a file OR direct insertion, not both.')
        } else {
            const data = directInput || await file.text();

            let regex;

            if (regExFlag) {
                const input = capture;

                const lastSlash = input.lastIndexOf('/');
                const pattern = input.slice(1, lastSlash);
                const flag = input.slice(lastSlash + 1);
                
                regex = new RegExp(pattern, flag);
            } else {
                const escaped = capture.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // treat prefix as literal text
                regex = new RegExp(`${escaped}(\\S+)`, 'g');
            }
  
            const IDs = [...data.matchAll(regex)].map(
                                                  match => regExFlag ?
                                                  match[1] :
                                                  match[1].replace(/[.,;:]+$/, '')); 
                                                  // strips trailing punctuation only, 
                                                  // e.g. "4891493." or "x@example.com,"

            // dummy regex: /ERROR:\s(\S+)/g

            const count = IDs.length;

            // let buffer = '';
            // buffer += JSON.stringify(IDs, null, 1); 

            // buffer = buffer.replaceAll('"',"'");
            // buffer = buffer.replaceAll('[','(');
            // buffer = buffer.replaceAll(']',')');
            // buffer = buffer.replaceAll('.','');
            // console.log(sqlFormat);

            const output = formatter(IDs, format, sqlFormat); //.replaceAll('.','');

            console.log(output);
            console.log(count);

            navigator.clipboard.writeText(output);
            console.log("Extracted data copied to clipboard.")
        };
    }
)

(
);