const $days = document.querySelector("#days");
const $hours = document.querySelector("#hours");
const $minutes = document.querySelector("#minutes");
const $seconds = document.querySelector("#seconds");
const $completeTime = document.querySelector("#completeTime");

const $dripDays = document.querySelector("#drip-days");
const $dripHours = document.querySelector("#drip-hours");
const $dripMinutes = document.querySelector("#drip-minutes");
const $dripSeconds = document.querySelector("#drip-seconds");
const $dripCompleteTime = document.querySelector("#drip-completeTime");

const targetDateTime = new Date("2025-01-01T03:00:00Z");
const dripTargetDateTime = new Date("2024-11-18T03:00:00Z");

$completeTime.textContent = targetDateTime.toLocaleString(navigator.language, {
	year: "numeric",
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	timeZoneName: "short",
});

$dripCompleteTime.textContent = dripTargetDateTime.toLocaleString(navigator.language, {
	year: "numeric",
	month: "short",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
	timeZoneName: "short",
});

startCountdown();

function startCountdown() {
	updateCountdown();

	const remainingMilliseconds = 1000 - (Date.now() % 1000);

	setTimeout(() => {
		updateCountdown();
		setInterval(updateCountdown, 1000);
	}, remainingMilliseconds);
}

function updateCountdown() {
	const { days, hours, minutes, seconds } = getHours();
	const { dripDays, dripHours, dripMinutes, dripSeconds } = getDripHours();

	$days.textContent = days.toString().padStart(2, "0");
	$hours.textContent = hours.toString().padStart(2, "0");
	$minutes.textContent = minutes.toString().padStart(2, "0");
	$seconds.textContent = seconds.toString().padStart(2, "0");

	$dripDays.textContent = dripDays.toString().padStart(2, "0");
	$dripHours.textContent = dripHours.toString().padStart(2, "0");
	$dripMinutes.textContent = dripMinutes.toString().padStart(2, "0");
	$dripSeconds.textContent = dripSeconds.toString().padStart(2, "0");

	console.log(
		`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds left.`,
	);

	console.log(
		`[Drip] ${dripDays} days, ${dripHours} hours, ${dripMinutes} minutes, and ${dripSeconds} seconds left.`,
	);
}

function getHours() {
	const now = new Date();

	const timeDifference = targetDateTime.getTime() - now.getTime();

	let seconds = 0;
	let minutes = 0;
	let hours = 0;
	let days = 0;

	if (timeDifference <= 0) {
		return { days, hours, minutes, seconds };
	}

	seconds = Math.floor(timeDifference / 1000);
	minutes = Math.floor(seconds / 60);
	hours = Math.floor(minutes / 60);
	days = Math.floor(hours / 24);

	seconds %= 60;
	minutes %= 60;
	hours %= 24;

	return { days, hours, minutes, seconds };
}

function getDripHours() {
	const now = new Date();

	const timeDifference = dripTargetDateTime.getTime() - now.getTime();

	let dripSeconds = 0;
	let dripMinutes = 0;
	let dripHours = 0;
	let dripDays = 0;

	if (timeDifference <= 0) {
		return { days, hours, minutes, seconds };
	}

	dripSeconds = Math.floor(timeDifference / 1000);
	dripMinutes = Math.floor(dripSeconds / 60);
	dripHours = Math.floor(dripMinutes / 60);
	dripDays = Math.floor(dripHours / 24);

	dripSeconds %= 60;
	dripMinutes %= 60;
	dripHours %= 24;

	return { dripDays, dripHours, dripMinutes, dripSeconds };
}
