import { main } from '../utils/db';

export default defineEventHandler(async () => {
    try {
        return await main();
    } catch (e) {
        return e;
    }
});
