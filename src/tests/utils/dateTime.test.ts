import { formatTimeRange } from '../../utils/dateTime';

describe('formatTimeRange function', () => {
	it('should return empty string if startTime oe endTime is null', () => {
		const startTime1 = '';
		const endTime1 = '2022-12-17 13:30:00';
		const expectedTimeRange1 = '';
		expect(formatTimeRange(startTime1, endTime1)).toBe(expectedTimeRange1);

		const startTime2 = '2022-12-17 15:45:00';
		const endTime2 = '';
		expect(formatTimeRange(startTime2, endTime2)).toBe(expectedTimeRange1);

		const startTime3 = '';
		const endTime3 = '';
		expect(formatTimeRange(startTime3, endTime3)).toBe(expectedTimeRange1);
	});

	it('formats time range correctly for AM and PM times', () => {
		const startTime1 = '2022-12-17 10:00:00';
		const endTime1 = '2022-12-17 13:30:00';
		const expectedTimeRange1 = '10:00 AM - 1:30 PM';
		expect(formatTimeRange(startTime1, endTime1)).toBe(expectedTimeRange1);

		const startTime2 = '2022-12-17 15:45:00';
		const endTime2 = '2022-12-17 16:30:00';
		const expectedTimeRange2 = '3:45 PM - 4:30 PM';
		expect(formatTimeRange(startTime2, endTime2)).toBe(expectedTimeRange2);
	});

	it('handles midnight (12:00 AM) correctly', () => {
		const startTime3 = '2022-12-17 00:00:00';
		const endTime3 = '2022-12-17 01:15:00';
		const expectedTimeRange3 = '12:00 AM - 1:15 AM';
		expect(formatTimeRange(startTime3, endTime3)).toBe(expectedTimeRange3);
	});

	it('handles noon (12:00 PM) correctly', () => {
		const startTime4 = '2022-12-17 12:00:00';
		const endTime4 = '2022-12-17 13:30:00';
		const expectedTimeRange4 = '12:00 PM - 1:30 PM';
		expect(formatTimeRange(startTime4, endTime4)).toBe(expectedTimeRange4);
	});

	it('pads minutes with leading zero when necessary', () => {
		const startTime5 = '2022-12-17 09:05:00';
		const endTime5 = '2022-12-17 09:10:00';
		const expectedTimeRange5 = '9:05 AM - 9:10 AM';
		expect(formatTimeRange(startTime5, endTime5)).toBe(expectedTimeRange5);
	});
});
