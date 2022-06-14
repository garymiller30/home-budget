export function convertDateToIso(timeZone: string = ""): Date {

    const localDateString = new Date().toLocaleString("us-US", {
        timeZone: timeZone
    })


    const s = localDateString.split(/\D/);
    const [day, month, year, , hour, min, sec] = s;
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(min), Number(sec))
    // return new Date(
    //     `${s[2]}-${s[1]}-${s[0]}T${s[4]}:${s[5]}:${s[6]}`)
}