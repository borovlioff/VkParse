function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function sleep(fn, time:number) {
    await timeout(time);
    return fn();
}