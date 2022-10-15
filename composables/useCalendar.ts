const getUppercase = (str: string) => str[0].toUpperCase() + str.slice(1);

export const useCaledar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const getDaysInMonth = (mm: number = month) => new Date(year, mm, 0).getDate() + 1;

    const getCalendarMonth = (): Array<Date> => {
        let futureDays = getDaysInMonth() - day;

        if (futureDays <= 7) {
            futureDays += getDaysInMonth(month + 1);
        }

        return new Array(futureDays)
            .fill(today)
            .map((date: Date, offset: number) => new Date(date.setDate(day + offset + 1)));
    };

    const getLocalizedDayOfWeek = (date: Date): string =>
        getUppercase(
            date.toLocaleDateString("ru", {
                weekday: "long",
            })
        );

    const getLocalizedMonth = (date: Date): string =>
        getUppercase(date.toLocaleDateString("ru", { month: "long" }))
            .replace(/(ь|й)$/, "я")
            .replace(/[т]$/, "та");

    const getNumericDate = (date: Date) =>
        date.toLocaleDateString("ru", { day: "numeric" });


    return {
        getCalendarMonth,
        getLocalizedDayOfWeek,
        getLocalizedMonth,
        getNumericDate
    }
}
