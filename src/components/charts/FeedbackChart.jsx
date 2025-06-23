import { useState, useEffect } from "react";import api from "../../assets/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

function FeedbackChart() {
	const [data, setData] = useState([]);

	const fetchFeedback = async () => {
		try {
			const response = await api.get(`/api/feedbacks/`);
			setData(response.data);
		} catch (error) {
			console.error("Error fetching feedbacks:", error);
			setData([]);
		}
	};

	useEffect(() => {
		fetchFeedback();
	}, []);

	return (
		<>
			<p className="text-gray-800 text-center pt-12 text-4xl font-extrabold">FEEDBACKS</p>

			<div className="space-y-6">
				<div
					className="text-right flex justify-end items-center space-x-1 text-blue-600 hover:underline cursor-pointer"
					onClick={fetchFeedback}>
					<RefreshIcon fontSize="small" />
					<p>Refresh</p>
				</div>

				{data.length > 0 ? (
					data.map((item, index) => (
						<div
							className="max-w-lg mx-auto px-6 py-1 rounded-lg"
							key={index}>
							<div className="flex items-center mb-1">
								<div className="">
									<div className="text-lg font-medium text-gray-800 -mb-2">{item.name}</div>
									<div className="text-gray-500">
										{new Date(item.created_at)
											.toLocaleString("en-US", {
												hour: "numeric",
												minute: "numeric",
												hour12: true,
												month: "long",
												day: "numeric",
												year: "numeric",
											})
											.replace("AM", "am")
											.replace("PM", "pm")}
									</div>
								</div>
							</div>
							<p className="text-lg leading-relaxed mb-6 italic">"{item.feedback}"</p>
						</div>
					))
				) : (
					<p className="text-center text-gray-500 italic">No feedbacks found.</p>
				)}
			</div>
		</>
	);
}

export default FeedbackChart;
