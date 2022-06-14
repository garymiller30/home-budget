export function convertDateToIso(timeZone: string = ""): Date {

    const localDateString = new Date().toLocaleString("us-US", {
        timeZone: timeZone
    })

    const s = localDateString.split(/\D/);

    return new Date(Number(s[0]), Number(s[1]) - 1, Number(s[2]), Number(s[4]), Number(s[5]), Number(s[6]))
    // return new Date(
    //     `${s[2]}-${s[1]}-${s[0]}T${s[4]}:${s[5]}:${s[6]}`)
}