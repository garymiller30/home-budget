export function convertDateToIso(localDate: string): Date {

    const s = localDate.split(/\D/);
    const [day, month, year, empty, hour, min, sec] = s;
    return new Date(+year, Number(month) - 1, +day, +hour, +min, +sec)
    // return new Date(
    //     `${s[2]}-${s[1]}-${s[0]}T${s[4]}:${s[5]}:${s[6]}`)
}