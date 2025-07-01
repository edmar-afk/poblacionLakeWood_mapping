import React, { useEffect, useState } from "react";import DataTable from "react-data-table-component";
import api from "../assets/api";
import AddHousehold from "../components/admin/AddHousehold";

function Household() {
	const [households, setHouseholds] = useState([]);
	const [filterText, setFilterText] = useState("");

	const fetchHouseholds = async () => {
		try {
			const res = await api.get("/api/households/");
			setHouseholds(res.data);
		} catch (err) {
			console.error("Failed to fetch households:", err);
		}
	};

	const deleteHousehold = async (id) => {
		try {
			await api.delete(`/api/households/delete/${id}/`);
			setHouseholds((prev) => prev.filter((h) => h.id !== id));
		} catch (err) {
			console.error("Failed to delete household:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	const filteredItems = households.filter((h) => h.family_name.toLowerCase().includes(filterText.toLowerCase()));

	const columns = [
		{
			name: "Family Name",
			selector: (row) => row.family_name,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<button
					type="button"
					onClick={() => deleteHousehold(row.id)}
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
					Delete
				</button>
			),
			ignoreRowClick: true,
			button: true,
		},
	];

	return (
		<section className="w-full">
			<div className="my-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
				<AddHousehold />
				<div className="flex flex-col md:flex-row gap-2">
					<input
						type="text"
						placeholder="Search family name"
						className="border border-gray-300 rounded px-3 py-1"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
					/>
					<p
						onClick={fetchHouseholds}
						className="cursor-pointer text-purple-600 hover:underline self-center">
						Refresh
					</p>
				</div>
			</div>

			<DataTable
				columns={columns}
				data={filteredItems}
				pagination
				highlightOnHover
				noDataComponent="No household records found."
				className="bg-white rounded"
			/>
		</section>
	);
}

export default Household;
