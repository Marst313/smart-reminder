import { format, parse, parseISO } from 'date-fns';

// Format date: 2026-01-27T00:00:00 → 2026/01/27
export function formatDate(dateString: string): string {
	try {
		const date = parseISO(dateString);
		return format(date, 'yyyy/MM/dd');
	} catch (error) {
		console.error(error);
		return dateString;
	}
}

// Format time: 2026-01-27T14:30:00 → 14:30
export function formatTime(timeString: string): string {
	try {
		const time = parseISO(timeString);
		return format(time, 'HH:mm');
	} catch (error) {
		console.error(error);
		return timeString;
	}
}

export function toISOWithJakartaOffset(date: string, time: string) {
	const dt = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());

	// full datetime (+07:00 ikut local server, asumsi Asia/Jakarta)
	const full = format(dt, "yyyy-MM-dd'T'HH:mm:ssxxx");

	// date only (00:00:00+07:00)
	const onlyDate = format(parse(date, 'yyyy-MM-dd', new Date()), "yyyy-MM-dd'T'00:00:00xxx");

	return {
		date: onlyDate,
		time: full
	};
}
