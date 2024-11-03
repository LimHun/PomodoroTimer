import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { timerState, isRunningState, roundsState, goalsState, formattedTimeSelector } from "../atoms/timerState";
import styled from "styled-components";
import { motion } from "framer-motion";
import { PlayIcon, PauseIcon } from "@heroicons/react/20/solid";

const PomodoroTimer: React.FC = () => {
	const [time, setTime] = useRecoilState(timerState);
	const [isRunning, setIsRunning] = useRecoilState(isRunningState);
	const [rounds, setRounds] = useRecoilState(roundsState);
	const [goals, setGoals] = useRecoilState(goalsState);
	const formattedTime = useRecoilValue(formattedTimeSelector);

	const toggleTimer = () => setIsRunning(!isRunning);

	// Timer countdown effect
	useEffect(() => {
		if (isRunning && time > 0) {
			const timerId = setInterval(() => setTime((prev) => prev - 1), 1000);
			return () => clearInterval(timerId);
		} else if (time === 0) {
			setRounds((prev) => prev + 1);
			setTime(25 * 60); // Reset to 25 minutes
		}
	}, [isRunning, time, setRounds, setTime]);

	// Goal increment effect
	useEffect(() => {
		if (rounds > 0 && rounds % 4 === 0) {
			setGoals((prev) => prev + 1);
			setRounds(0); // Reset rounds after completing a goal
		}
	}, [rounds, setGoals]);

	// 분과 초를 각각 변수로 나눔
	const [minutes, seconds] = formattedTime.split(":");

	return (
		<TimerContainer>
			<Title>Pomodoro</Title>
			<TimerDisplay>
				<AnimatedCard key={minutes}>{minutes}</AnimatedCard>
				<Separator>:</Separator>
				<AnimatedCard key={seconds}>{seconds}</AnimatedCard>
			</TimerDisplay>
			<PlayPauseButton onClick={toggleTimer} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} aria-label="Play or Pause Timer">
				{isRunning ? <PauseIcon /> : <PlayIcon />}
			</PlayPauseButton>
			<RoundGoalInfo>
				<p>
					<span>{rounds}/4</span>
					ROUND
				</p>
				<p>
					<span>{goals}/12</span>
					GOAL
				</p>
			</RoundGoalInfo>
		</TimerContainer>
	);
};

export default PomodoroTimer;

// Styled components and animations
const TimerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	padding: 30px;
	background-color: #e76f51;
	color: #fff;
	border-radius: 15px;
	width: 320px;
	margin: auto;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
	font-size: 24px;
	font-weight: bold;
	color: #fff;
	margin-bottom: 20px;
`;

const TimerDisplay = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	font-size: 48px;
	color: #e76f51;
`;

const AnimatedCard = styled(motion.div)`
	background-color: #fff;
	padding: 10px 20px;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	font-weight: bold;
	width: 60px;
	text-align: center;
	font-size: 48px;
	color: #e76f51;
`;

// 각 카드의 애니메이션 설정
AnimatedCard.defaultProps = {
	initial: { scale: 1 },
	animate: { scale: [1, 1.2, 1] },
	transition: { duration: 0.3 },
};

const Separator = styled.span`
	font-size: 48px;
	font-weight: bold;
	color: #fff;
`;

const PlayPauseButton = styled(motion.button)`
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background-color: #2a9d8f;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	cursor: pointer;
	border: none;

	&:hover {
		background-color: #21867a;
	}

	& svg {
		width: 30px;
		height: 30px;
		color: #fff;
	}
`;

const RoundGoalInfo = styled.div`
	display: flex;
	justify-content: space-around;
	width: 100%;
	padding-top: 15px;
	border-top: 2px solid rgba(255, 255, 255, 0.3);
	color: #fff;

	& p {
		font-size: 14px;
		text-align: center;

		& span {
			font-size: 18px;
			font-weight: bold;
			display: block;
		}
	}
`;
