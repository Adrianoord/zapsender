export const sleep = (timer: number): Promise<void> => {
    return new Promise((resolve)=>{
        setTimeout(resolve, timer);
    });
}