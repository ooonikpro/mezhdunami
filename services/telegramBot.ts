import axios from 'axios';

const client = axios.create({
    baseURL: `https://api.telegram.org/bot${process.env.TELEGRAM_BOT || ''}`
})

const subscribers = ['209442952'];

if (process.env.NODE_ENV === 'production') {
    subscribers.push('460173300');
}

const sendMessage = (to: string, message: string) => client.get(`/sendMessage`, {
    params: {
        chat_id: to,
        text: message,
        parse_mode: 'HTML',
        disable_notification: false
    }
});

export const notifySubscribers = (message: string) => subscribers.map((to) => sendMessage(to, message));
