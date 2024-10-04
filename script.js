const $days = document.querySelector("#days");
const $hours = document.querySelector("#hours");
const $minutes = document.querySelector("#minutes");
const $seconds = document.querySelector("#seconds");
const $completeTime = document.querySelector("#completeTime");

const targetDateTime = new Date("2024-11-20T03:00:00Z");

$completeTime.textContent = targetDateTime.toLocaleString(navigator.language, {
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

	$days.textContent = days.toString().padStart(2, "0");
	$hours.textContent = hours.toString().padStart(2, "0");
	$minutes.textContent = minutes.toString().padStart(2, "0");
	$seconds.textContent = seconds.toString().padStart(2, "0");

	console.log(
		`${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds left.`,
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
