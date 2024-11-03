import React from "react";
import { Routes, Route } from "react-router-dom";
import PomodoroTimer from "./pages/PomodoroTimer";
import { RecoilRoot } from "recoil";

const App: React.FC = () => {
	return (
		<RecoilRoot>
			<Routes>
				<Route path="/" element={<PomodoroTimer />} />
			</Routes>
		</RecoilRoot>
	);
};

export default App;
