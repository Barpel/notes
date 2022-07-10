const parseTimeFromSeconds = (timeInSeconds: number) => {
    const SECONDS_IN_MINUTE = 60;
    const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * 60;
    const SECONDS_IN_DAY = SECONDS_IN_HOUR * 24;

    let calc;
    if (timeInSeconds < 60) {
        return `${timeInSeconds} second${timeInSeconds > 1 ? 's' : ''}`;
    } else if (timeInSeconds < SECONDS_IN_HOUR) {
        calc = Math.floor(timeInSeconds / SECONDS_IN_MINUTE);
        return `${calc} minute${calc > 1 ? 's' : ''}`;
    } else if (timeInSeconds < SECONDS_IN_DAY) {
        calc = Math.floor(timeInSeconds / SECONDS_IN_HOUR);
        return `${calc} hour${calc > 1 ? 's' : ''}`;
    }

    calc = Math.floor(timeInSeconds / SECONDS_IN_DAY);
    return `${calc} day${calc > 1 ? 's' : ''}`;
}

const calculateTimeDifference = (time: Date) => {
    const now = new Date();
    return (now.getTime() - time.getTime()) / 1000;
};

export { parseTimeFromSeconds, calculateTimeDifference };