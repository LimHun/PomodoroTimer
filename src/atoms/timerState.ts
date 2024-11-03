// src/atoms/timerState.ts
import { atom, selector } from "recoil";

export const timerState = atom<number>({
	key: "timerState",
	default: 25 * 60, // 25 minutes in seconds
});

export const isRunningState = atom<boolean>({
	key: "isRunningState",
	default: false,
});

export const roundsState = atom<number>({
	key: "roundsState",
	default: 0,
});

export const goalsState = atom<number>({
	key: "goalsState",
	default: 0,
});

export const formattedTimeSelector = selector({
	key: "formattedTimeSelector",
	get: ({ get }) => {
		const totalSeconds = get(timerState);
		const minutes = Math.floor(totalSeconds / 60)
			.toString()
			.padStart(2, "0");
		const seconds = (totalSeconds % 60).toString().padStart(2, "0");
		return `${minutes}:${seconds}`;
	},
});
