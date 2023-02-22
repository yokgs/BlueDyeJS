export const number2shex = (a: number) => ((a > 15 ? '' : '0') + Math.floor(a).toString(16));
export const shex2number = (a: string) => {
    if (a.length == 4) return parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16);
    return parseInt(a.substr(1), 16);
}