export const useTelegramBot = () => {
    const me = 209442952;
    const five = 460173300;
    const BASE_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT}`;
    const sendMessage = (to: number, text: string) => {
        console.log(`${BASE_URL}/sendmessage?chat_id=${to}&text=${text}`)
    };

    sendMessage(me, 'Еще один записался');
    sendMessage(five, 'Скоро тут будут сыпаться');
}
