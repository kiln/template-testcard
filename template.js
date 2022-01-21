const data = {};

const state = {
	boolean: true,
	color: "#FF0000",
	colors: ["#FF0000", "#00FF00", "#0000FF"],
	number: 42,
	string: "Hello world",
	choice: "choice_a",
	text: "since feeling is first\nwho pays any attention\nto the syntax of things\nwill never wholly kiss you;",
	font: { name: "Playfair Display", url: "https://fonts.googleapis.com/css?family=Playfair+Display:400,700" },
	url: "https://app.flourish.studio/image/logo.png"
};

function updateDataTables() {
	for (const [name, dataset] of Object.entries(data)) {
		const {column_names} = dataset;
		const table = document.createElement("table");
		const table_head = document.createElement("tr");
		for (const columns of Object.values(column_names)) {
			for (const column of [columns].flat()) {
				const cell = document.createElement("th");
				cell.textContent = column;
				table_head.appendChild(cell);
			}
		}
		table.appendChild(table_head);

		for (const row of dataset) {
			const table_row = document.createElement("tr");
			for (const column_name of Object.keys(column_names)) {
				const values = row[column_name];
				for (const value of [values].flat()) {
					const cell = document.createElement("td");
					cell.textContent = value;
					table_row.appendChild(cell);
				}
			}
			table.appendChild(table_row);
		}

		document
			.querySelector(`.table-container-${name.replaceAll("_", "-")}`)
			.replaceChildren(table);
	}
}

function updateWindowFlourish() {
	const fields = ["environment", "is_read_only", "fixed_height"];
	for (const field of fields) {
		const item = document.querySelector(`.win-fl-item-${field.replaceAll("_", "-")}`);
		item.textContent = window.Flourish[field];
	}
}

function updateSettings() {
	const settings_list = document.createElement("dl");
	for (const [key, value] of Object.entries(state)) {
		const term = document.createElement("dt");
		term.textContent = key;
		const definition = document.createElement("dd");
		settings_list.appendChild(term);
		const pre = document.createElement("pre");
		const code = document.createElement("code");
		code.textContent = JSON.stringify(value);
		pre.appendChild(code);
		definition.appendChild(pre);
		settings_list.appendChild(definition);
	}

	document.querySelector(".settings-list-container").replaceChildren(settings_list);
}

function addActionListeners() {
	document.querySelector(".action-set-height-fixed").addEventListener("click", () => {
		window.Flourish.setHeight(500);
	});

	document.querySelector(".action-set-height-null").addEventListener("click", () => {
		window.Flourish.setHeight(null);
	});

	document.querySelector(".action-set-height-incorrect").addEventListener("click", () => {
		window.Flourish.setHeight("Incorrect value");
	});

	document.querySelector(".action-upload-image-correct").addEventListener("click", () => {
		window.Flourish.uploadImage({ name: "url" });
	});

	document.querySelector(".action-upload-image-incorrect").addEventListener("click", () => {
		window.Flourish.uploadImage("Incorrect value");
	});

	document.querySelector(".action-warn-correct").addEventListener("click", () => {
		window.Flourish.warn({
			message: "Testcard template warning",
			explanation: "Testcard template warning explanation"
		});
	});

	document.querySelector(".action-warn-incorrect").addEventListener("click", () => {
		window.Flourish.warn({ message: [] });
	});

	document.querySelector(".action-set-setting-correct").addEventListener("click", () => {
		window.Flourish.setSetting("string", "Changed setting");
	});

	document.querySelector(".action-set-setting-incorrect").addEventListener("click", () => {
		window.Flourish.setSetting([], {});
	});
}

function draw() {
	addActionListeners();
	update();
}

function update() {
	updateDataTables();
	updateSettings();
	updateWindowFlourish();
}

window.template = {
	data,
	draw,
	state,
	update,
};
