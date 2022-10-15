export const useCaledar = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const getCalendarWeek = () => new Array(7).fill(today).map((date: Date, offset: number) => date.setDate(day + offset));
    const getCalendarMonth = () => new Array();

    const getUppercase = (str: string) => str[0].toUpperCase() + str.slice(1);
    const getDayOfWeek = (date: Date) =>
        getUppercase(
            date.toLocaleDateString("ru", {
                weekday: "long",
            })
        );

    const getMonth = (date: Date) =>
        getUppercase(date.toLocaleDateString("ru", { month: "long" }))
            .replace(/(ь|й)$/, "я")
            .replace(/[т]$/, "та");

    const getDay = (date: Date) =>
        date.toLocaleDateString("ru", { day: "numeric" });

    const calendar = readonly(
        new Array(7).fill(undefined).map((_, index) => {
            const date = getDateFor(index);

            return {
                label: index ? getDayOfWeek(date) : "Завтра",
                date: `${getDay(date)} ${getMonth(date)}`,
            };
        })
    );
}
