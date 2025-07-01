import React, { useEffect, useState } from "react";import api from "../assets/api";
import { Elderly, WheelchairPickup, Groups, Business } from "@mui/icons-material";

function Dashboard() {
	const [stats, setStats] = useState({
		total_pwds: 0,
		total_seniors: 0,
		total_households: 0,
		total_infrastructures: 0,
	});

	useEffect(() => {
		api.get("/api/stats/").then((res) => {
			setStats(res.data);
		});
	}, []);

	return (
		<div className="mt-24 py-24 rounded-xl w-full overflow-x-hidden bg-green-200 flex items-center justify-center text-gray-800 px-4">
			<div className="grid lg:grid-cols-2 md:grid-cols-2 gap-6 w-full max-w-6xl">
				<div className="w-full flex items-center p-4 bg-white rounded">
					<div className="flex items-center justify-center bg-green-200 h-16 w-16 rounded">
						<WheelchairPickup className="text-green-700 w-6 h-6" />
					</div>
					<div className="ml-4 flex flex-col flex-grow">
						<span className="text-xl font-bold">{stats.total_pwds}</span>
						<div className="text-gray-500">PWDs</div>
					</div>
				</div>

				<div className="w-full flex items-center p-4 bg-white rounded">
					<div className="flex items-center justify-center bg-blue-200 h-16 w-16 rounded">
						<Elderly className="text-blue-700 w-6 h-6" />
					</div>
					<div className="ml-4 flex flex-col flex-grow">
						<span className="text-xl font-bold">{stats.total_seniors}</span>
						<div className="text-gray-500">Senior Citizens</div>
					</div>
				</div>

				<div className="w-full flex items-center p-4 bg-white rounded">
					<div className="flex items-center justify-center bg-yellow-200 h-16 w-16 rounded">
						<Groups className="text-yellow-700 w-6 h-6" />
					</div>
					<div className="ml-4 flex flex-col flex-grow">
						<span className="text-xl font-bold">{stats.total_households}</span>
						<div className="text-gray-500">Households</div>
					</div>
				</div>

				<div className="w-full flex items-center p-4 bg-white rounded">
					<div className="flex items-center justify-center bg-purple-200 h-16 w-16 rounded">
						<Business className="text-purple-700 w-6 h-6" />
					</div>
					<div className="ml-4 flex flex-col flex-grow">
						<span className="text-xl font-bold">{stats.total_infrastructures}</span>
						<div className="text-gray-500">Infrastructures</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
