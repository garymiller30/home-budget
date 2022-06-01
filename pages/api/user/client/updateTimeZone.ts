export async function updateTimeZone(userId: string) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    await fetch('/api/user/server/updateTimeZone', {
        method: 'PUT',
        body: JSON.stringify({ userId, timeZone })
    })
}