export const formatCreatedAt = (isoDate?: string | null, locale = "uk-UA"): string => {
    if (!isoDate) return "—";

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) return "—";

    return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(date);
}