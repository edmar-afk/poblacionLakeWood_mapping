import { useEffect, useState } from "react";import DataTable from "react-data-table-component";
import api from "../assets/api";
import AddInfrastructures from "../components/admin/AddInfrastructures";

function Infrastructure() {
	const [infras, setInfras] = useState([]);
	const [filterText, setFilterText] = useState("");

	const fetchInfras = async () => {
		try {
			const res = await api.get("/api/infras/");
			setInfras(res.data);
		} catch (err) {
			console.error("Failed to fetch Infrastructures:", err);
		}
	};

	const deleteInfra = async (id) => {
		try {
			await api.delete(`/api/infrastructure/delete/${id}/`);
			setInfras((prev) => prev.filter((i) => i.id !== id));
		} catch (err) {
			console.error("Failed to delete Infrastructure:", err);
		}
	};

	useEffect(() => {
		fetchInfras();
	}, []);

	const columns = [
		{
			name: "Image",
			cell: (row) =>
				row.image ? (
					<img
						src={row.image}
						alt="infra"
						className="w-16 h-16 object-cover rounded"
					/>
				) : (
					<span className="text-gray-400 italic">No Image</span>
				),
			width: "100px",
		},
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Type",
			selector: (row) => row.type,
			sortable: true,
		},
		{
			name: "Description",
			selector: (row) => row.description,
			wrap: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<button
					type="button"
					onClick={() => deleteInfra(row.id)}
					className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1">
					Delete
				</button>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	const filteredItems = infras.filter(
		(infra) =>
			(infra.name || "").toLowerCase().includes(filterText.toLowerCase()) ||
			(infra.type || "").toLowerCase().includes(filterText.toLowerCase()) ||
			(infra.description || "").toLowerCase().includes(filterText.toLowerCase())
	);

	return (
		<section className="w-full">
			<div className="my-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
				<AddInfrastructures />
				<div className="flex flex-col md:flex-row gap-2">
					<input
						type="text"
						placeholder="Search name, type, description"
						className="border border-gray-300 rounded px-3 py-1"
						value={filterText}
						onChange={(e) => setFilterText(e.target.value)}
					/>
					<p
						onClick={fetchInfras}
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
				pointerOnHover
				noDataComponent="No infrastructure records found."
				className="bg-white rounded"
			/>
		</section>
	);
}

export default Infrastructure;
