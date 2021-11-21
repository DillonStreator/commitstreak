export const midnightInterval = (fn: ()=>void) => {
    const midnight = new Date();
    midnight.setHours( 24 );
    midnight.setMinutes( 0 );
    midnight.setSeconds( 0 );
    midnight.setMilliseconds( 0 );
    const msUntilMidnight = ( midnight.getTime() - new Date().getTime() ) / 1000;

    setTimeout(() => {
        fn()
        setInterval(fn, 1000 * 60 * 60 * 24)
    }, msUntilMidnight)
}
