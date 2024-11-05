import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const displayDateTime = (dateTime: string) => {
    const date = dayjs(dateTime);
    const now = dayjs();

    // If the date is recent (within 7 days), show "X days ago"
    if (now.diff(date, 'day') < 7) {
        return date.fromNow();
    }

    // Otherwise, display a friendly format like "Sunday, Sep 10 at 5:30 PM"
    return date.format('dddd, MMM D [at] h:mm A');
};
