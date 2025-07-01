import { useState } from "react";import Dashboard from "./Dashboard";import Pwd from "./Pwd";import LogoutIcon from "@mui/icons-material/Logout";import ElderlyIcon from "@mui/icons-material/Elderly";import AccessibleIcon from "@mui/icons-material/Accessible";
import { Link } from "react-router-dom";
import Seniors from "./Seniors";
import Infrastructure from "./Infrastructures";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import Household from "./Household";
import HouseholdMembers from "./HouseholdMembers";
function Admin() {
	const [activeTab, setActiveTab] = useState("dashboard");

	return (
		<>
			<button
				data-drawer-target="default-sidebar"
				data-drawer-toggle="default-sidebar"
				aria-controls="default-sidebar"
				type="button"
				className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:focus:ring-gray-600">
				<span className="sr-only">Open sidebar</span>
				<svg
					className="w-6 h-6"
					aria-hidden="true"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg">
					<path
						clipRule="evenodd"
						fillRule="evenodd"
						d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
				</svg>
			</button>

			<aside
				id="default-sidebar"
				className="fixed bg-white pt-14 top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
				aria-label="Sidebar">
				<div className="h-full px-3 py-4 overflow-y-auto">
					<ul className="space-y-2 font-medium">
						<li>
							<a
								href="#"
								onClick={() => setActiveTab("dashboard")}
								className="flex items-center p-2 text-gray-800 rounded-lg group">
								<span className="ms-3">Dashboard</span>
							</a>
						</li>

						<li>
							<a
								href="#"
								onClick={() => setActiveTab("pwd")}
								className="flex items-center p-2 text-gray-800 rounded-lg group">
								
								<span className="flex-1 ms-3 whitespace-nowrap">PWD</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => setActiveTab("seniors")}
								className="flex items-center p-2 text-gray-800 rounded-lg group">
							
								<span className="flex-1 ms-3 whitespace-nowrap">Seniors</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => setActiveTab("infras")}
								className="flex items-center p-2 text-gray-800 rounded-lg group">
								
								<span className="flex-1 ms-3 whitespace-nowrap">Infrastructure</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => setActiveTab("household")}
								className="flex items-center p-2 text-gray-800 rounded-lg group">
								
								<span className="flex-1 ms-3 whitespace-nowrap">Household</span>
							</a>
						</li>
						<li>
							<a
								href="#"
								onClick={() => setActiveTab("householdMembers")}
								className="flex items-center p-2 text-gray-800 rounded-lg group">
							
								<span className="flex-1 ms-3 whitespace-nowrap">Household Members</span>
							</a>
						</li>
						<li className="p-2 text-gray-800 font-bold">
							<Link to={"/"}>
								
								<span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
							</Link>
						</li>
					</ul>
				</div>
			</aside>

			<div className="p-4 sm:ml-64 bg-white h-screen ">
				
				{activeTab === "dashboard" && <Dashboard />}
				{activeTab === "pwd" && <Pwd />}
				{activeTab === "seniors" && <Seniors />}
				{activeTab === "infras" && <Infrastructure />}
				{activeTab === "household" && <Household />}
				{activeTab === "householdMembers" && <HouseholdMembers />}
			</div>
		</>
	);
}

export default Admin;
