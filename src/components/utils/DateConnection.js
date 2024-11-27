export function DateConnection(datetime) {
    const now = new Date();
    const givenDate = new Date(datetime);

    // Asegurarse de que sea una fecha válida
    if (!datetime) {
        return "Sin registros";
    }

    const diffInMs = now - givenDate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInYears = now.getFullYear() - givenDate.getFullYear();

    if (diffInYears > 0) {
        if (
            now.getMonth() < givenDate.getMonth() ||
            (now.getMonth() === givenDate.getMonth() && now.getDate() < givenDate.getDate())
        ) {
            return `${diffInYears - 1} año(s)`;
        }
        return `${diffInYears} año(s)`;
    } else if (diffInDays > 0) {
        return `${diffInDays} día(s)`;
    } else if (diffInHours > 0) {
        return `${diffInHours} hora(s)`;
    } else {
        return `${diffInMinutes} minuto(s)`;
    }
}