import { useEffect, useState } from "react";import DataTable from "react-data-table-component";
import api from "../assets/api";
import AddMembers from "../components/admin/AddMembers";

function HouseholdMembers() {
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

	const deleteMember = async (householdId, memberId) => {
		try {
			await api.delete(`/api/households/${householdId}/members/${memberId}/`);
			setHouseholds((prev) =>
				prev.map((household) =>
					household.id === householdId
						? {
								...household,
								members: household.members.filter((m) => m.id !== memberId),
						  }
						: household
				)
			);
		} catch (err) {
			console.error("Failed to delete member:", err);
		}
	};

	useEffect(() => {
		fetchHouseholds();
	}, []);

	const members = households.flatMap((household) =>
		household.members.map((member, idx) => ({
			id: member.id,
			householdId: household.id,
			family_name: household.family_name,
			member_name: member.name,
			age: member.age,
			role: member.role,
			show_family_name: idx === 0,
		}))
	);

	const filteredItems = members.filter(
		(m) =>
			m.family_name.toLowerCase().includes(filterText.toLowerCase()) ||
			m.member_name.toLowerCase().includes(filterText.toLowerCase()) ||
			m.role.toLowerCase().includes(filterText.toLowerCase()) ||
			(m.age + "").includes(filterText)
	);

	const columns = [
		{
			name: "Family Name",
			selector: (row) => row.family_name,
			sortable: true,
			cell: (row, index) => {
				const prev = filteredItems[index - 1];
				if (!prev || prev.family_name !== row.family_name) {
					return row.family_name;
				}
				return "";
			},
			grow: 1.5,
		},
		{
			name: "Member Name",
			selector: (row) => row.member_name,
			sortable: true,
		},
		{
			name: "Age",
			selector: (row) => row.age,
			sortable: true,
			width: "80px",
		},
		{
			name: "Role",
			selector: (row) => row.role,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<button
					type="button"
					onClick={() => deleteMember(row.householdId, row.id)}
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
				<AddMembers />
				<div className="flex flex-col md:flex-row gap-2">
					<input
						type="text"
						placeholder="Search family, name, role, age"
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
				noDataComponent="No household members found."
				className="bg-white rounded"
			/>
		</section>
	);
}

export default HouseholdMembers;
