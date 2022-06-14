export function convertDateToIso(localDate: string): Date {

    const s = localDate.split(/\D/);
    return new Date(
        `${s[2]}-${s[1]}-${s[0]}T${s[4]}:${s[5]}:${s[6]}`)
}