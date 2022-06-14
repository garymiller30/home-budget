export function convertDateToIso(timeZone: string = ""): Date {

    const localDateString = new Date().toLocaleString("us-US", {
        timeZone
    })

    const s = localDateString.split(/\D/);

    //const year = parseInt(s[2])

    const date = new Date(parseInt(s[2]), parseInt(s[1]) - 1, parseInt(s[0]), parseInt(s[4]), parseInt(s[5]), parseInt(s[6]))

    //console.log(date)
    return date;
    // return new Date(
    //     `${s[2]}-${s[1]}-${s[0]}T${s[4]}:${s[5]}:${s[6]}`)
}