export function formatTimeRange(startTime: string, endTime: string): string {
	if (!startTime || !endTime) return '';
	const formatTime = (time: string): string => {
		const date = new Date(time);
		const hour = date.getHours();
		const minute = date.getMinutes();
		const period = hour >= 12 ? 'PM' : 'AM';
		const formattedHour = hour % 12 || 12;
		const formattedMinute = minute.toString().padStart(2, '0');
		return `${formattedHour}:${formattedMinute} ${period}`;
	};

	const formattedStartTime = formatTime(startTime);
	const formattedEndTime = formatTime(endTime);

	return `${formattedStartTime} - ${formattedEndTime}`;
}
