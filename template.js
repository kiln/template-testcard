const data = {};

const state = {};

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

function draw() {
	update();
}

function update() {
	updateDataTables();
	updateWindowFlourish();
}

window.template = {
	data,
	draw,
	state,
	update,
};
