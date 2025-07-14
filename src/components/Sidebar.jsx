import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PwdCharts from "./charts/PwdCharts";
import InfrasChart from "./charts/InfrasChart";
import SeniorCharts from "./charts/SeniorCharts";
import HouseholdChart from "./charts/HouseholdChart";
import FeedbackChart from "./charts/FeedbackChart";
import FeedBack from "./FeedBack";

function Sidebar({ categoryKey }) {
	return (
		<>
			<div className="block w-[250px] h-full mb-44">
				<div className="pt-8 space-y-4">
					{categoryKey === "pwds" ? (
						<PwdCharts />
					) : categoryKey === "infras" ? (
						<InfrasChart />
					) : categoryKey === "seniors" ? (
						<SeniorCharts />
					) : categoryKey === "households" ? (
						<HouseholdChart />
					) : categoryKey === "feedbacks" ? (
						<FeedbackChart />
					) : (
						<>
							{" "}
							<p className="text-gray-800 text-center pt-44 text-4xl font-extrabold">WELCOME TO POBLACION LAKEWOOD</p>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default Sidebar;
