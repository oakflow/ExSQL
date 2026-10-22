    // console.clear()
const select = document.getElementById("scriptSelect");       

const inputs = document.getElementById("inputs");         

const fileBlock = document.getElementById("fileBlock");
const fileInput = document.getElementById("file"); // always hidden, fileButton is used in its place for better styling
const fileButton = document.getElementById("fileButton");
const fileInsert = document.getElementById("fileInsert"); 
const removeFile = document.getElementById("rmFile");
const removeInserted = document.getElementById("rmInserted");

const sqlFormat = document.getElementById("sqlFormat");
const format = document.getElementById("format");
const colNo = document.getElementById("columnNoInput");


const execute = document.getElementById("execute");
const clear = document.getElementById("clear");


function replace(oldPattern, newPattern, data) {
	return data.replaceAll(oldPattern, newPattern);
}

function updateInputs() {              
	if (select.value === "count.js") {                  
		inputs.innerHTML = `                     
		<input                         
			type="text"                         
			id="countInput"                         
			placeholder="Character/word to count"                      
			style="                         
			width: 100%;                          
			font-size: 18px;                    
			padding: 3px;              			                  
			box-sizing: border-box;     
			min-height: 30px;
			height: 30px;   
			">          
		`;     

	} else if (select.value === "extract.js") {
		inputs.innerHTML = `                     
		<div style="display: flex;">

			<textarea
				id="extractInput"
				placeholder="e.g., ERROR:(literal space)"
				style="padding: 3px; width: 77.5%; font-size: 18px;
				box-sizing: border-box;
				max-width: 77.5%;
				min-width: 77.5%;
				min-height: 30px;
				height: 30px;
				"></textarea>

			<button
				id="rmInput"
				style="padding: 3px; width: 20%; font-size: 15px; margin-left: 2.5%;">
				&#x232B
				</button>

		</div>

		<select   
			title="desired method of extraction"                      
			type="text"                         
			id="extractBool"                                             
			style="                             
			width: 100%;                             
			font-size: 18px;                             
			padding: 3px;                             
			box-sizing: border-box;                             
			margin-top: 2.5%;       
			height: 30px;                 
			">
			<option value="minimal">Minimal</option>   
			<option value="regex">RegEx</option>  
			</select>          
		`;              	
	} else if (select.value === "replace.js") {
		inputs.innerHTML = `                     
		<input                         
			type="text"                         
			id="oldInput"                         
			placeholder="To Find"                         
			style="                             
			width: 100%;                             
			font-size: 18px;                             
			padding: 3px;                             
			box-sizing: border-box;   
			min-height: 30px;
			height: 30px;                      
			">                      

		<input                         
			type="text"                         
			id="newInput"                         
			placeholder="Replace with"                         
			style="                             
			width: 100%;                             
			font-size: 18px;                             
			padding: 3px;                             
			box-sizing: border-box;                             
			margin-top: 2.5%;                        
			">                 
		`;    

	} else if (select.value === "transform.js") {                  
		inputs.innerHTML = `           
		<input                         
			type="text"                         
			id="structureInput"                         
			placeholder="(optional) Cols. wanted, e.g., 1,3,4 or 3,1,3,4"                         
			style=" width: 100%; font-size: 18px; padding: 3px; box-sizing: border-box; 
			min-height: 30px;
			height: 30px;
			">    
		`;
		// optExcel.style.display = "none";
		
	} else if (select.value === "filter.js") {                  
		inputs.innerHTML = ` 
		<div style="display: flex;">
			<textarea
				id="filterInput"
				placeholder="Items to except"
				style="padding: 3px; width: 77.5%; font-size: 18px;
				box-sizing: border-box;
				max-width: 77.5%;
				min-width: 77.5%;
				min-height: 30px;
				height: 30px;
				"></textarea>

			<button
				id="rmInput"
				style="padding: 3px; width: 20%; font-size: 15px; margin-left: 2.5%;">
				&#x232B
				</button>
		</div>

		<input                         
			type="text"                    
			id="columnNoInput"                         
			placeholder="Number of column filtered by, e.g., 4"                         
			style="                             
			width: 100%;                             
			font-size: 18px;                             
			padding: 3px;                             
			box-sizing: border-box;                             
			margin-top: 2.5%;                         
			"
			hidden
			>       
		`;      

	} else if (select.value === "duplicates.js") {                  
		inputs.innerHTML = `
		`;             
	} else if (select.value === "mismatch.js") {                  
		inputs.innerHTML = `
		<textarea
			id="matchInput"
			placeholder="Match against"
			style="padding: 3px; width: 77.5%; font-size: 18px;
			box-sizing: border-box;
			max-width: 100%;
			min-width: 100%;
			min-height: 30px;
			height: 30px;
			"></textarea>
		`;             
	}
}     



function checkFormat() {
	if (format.value === "Excel" || outputBlock.style.display === "none") { 
		sqlFormat.hidden = true;
		} else {
		sqlFormat.hidden = false;
	};
};

select.addEventListener("change", () => {             
	updateInputs();
	
	const outputBlock = document.getElementById("outputBlock");
	const inputBlock = document.getElementById("inputBlock");
	const exceptions = ['count.js', 'replace.js']; // no output block
	const exceptions2 = ['duplicates.js']; // no input block

	if (exceptions.includes(select.value)) { 
		outputBlock.style.display = "none";
		inputBlock.style.display = 'flex';
		checkFormat()

	} else if (exceptions2.includes(select.value)) {
		inputBlock.style.display = "none";
		outputBlock.style.display = 'flex';
		checkFormat()
	} else {
		outputBlock.style.display = "flex";
		inputBlock.style.display = "flex";
		checkFormat()
	};
});

format.addEventListener("change", () => {
	checkFormat()
});


fileButton.addEventListener("click", () => {
	fileInput.click();
})

fileInput.addEventListener("change", async () => {              
	const file = fileInput.files?.[0];    

	if (!file) {return}              
	
	const data = await file.text();
	
	console.log("Uploaded File:")
	console.log(data);
	
	if (file) {
		fileButton.textContent = file.name;
	}
});          

removeFile.addEventListener("click", () => {
	fileInput.value = '';
	fileButton.textContent = 'Choose File';
})

removeInserted.addEventListener("click", () => {
	fileInsert.value = '';
})




// for extract.js, changes the placeholder of the input field based on the selected extraction method
const observer = new MutationObserver(() => {
	const regexSelect = document.getElementById("extractBool");
	
	if (regexSelect) { 
		const inputPlaceholder = document.getElementById("extractInput");

		regexSelect.addEventListener( "change", () => {
			if (regexSelect.value === "regex") {
				inputPlaceholder.placeholder = "e.g., /ERROR:\\s(\\S+)/g";
			} else {
				inputPlaceholder.placeholder = "e.g., ERROR:(literal space)";
			}   	
		});
	}
}); 
observer.observe(document.body, {
	childList: true,
	subtree: true
});



// for extract.js and filter.js, adds a click event listener to the remove button to clear the input field
const observer2 = new MutationObserver(() => {
	const eI = document.getElementById("extractInput");
	const fI = document.getElementById("filterInput");

	if (eI || fI) { 
		const removeInput = document.getElementById("rmInput");
		removeInput.addEventListener("click", () => {
			if (eI) {
				eI.value = '';
			} else {
				fI.value = '';
			}
		});
	}
});
observer2.observe(document.body, {
	childList: true,
	subtree: true
});

// for filter.js, shows or hides the column number input field based on selected SQL output structure
const observer3 = new MutationObserver(() => {
	const colNo = document.getElementById("columnNoInput");

	if (colNo) { 
		// initial load
		if (sqlFormat.value === 'values') {
			colNo.hidden = false;
		} else {
			colNo.hidden = true;
		}

		// any further changes
		sqlFormat.addEventListener("change", () => {
			if (sqlFormat.value === 'values') {
				colNo.hidden = false;
			} else {
				colNo.hidden = true;
			}
		});
	}
});
observer3.observe(document.body, {
	childList: true,
	subtree: true
});


execute.addEventListener("click", () => {
	const script = document.createElement("script");

	script.src = `../scripts/${select.value}`;
	console.log("Script Output:")
	document.body.appendChild(script);
})

clear.addEventListener("click", () => {
	console.clear();
})

updateInputs();      
