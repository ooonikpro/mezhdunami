import { getCollection } from "../clients/DataBaseClient";

const collection = getCollection('schedule');

export const getCurrentSchedule = async (): Promise<Array<any>> => {
    const schedule = await collection;

    const result = await schedule.find({
        date: {
            $gt: new Date().getTime()
        }
    }).toArray();

    return await result.map((item) => item.date);
}

export const findOne = async (date: number): Promise<number | undefined> => {
    const schedule = await collection;

    const result = await schedule.find({ date }).toArray();

    return result[0];
}

export const addToSchedule = async (data: Tech.PatientFormData) => {
    const schedule = await collection;

    if (await findOne(data.date)) {
        return createError({ statusCode: 400, message: 'Это время занято. Выберите пожалуйста другое', data });
    }

    schedule.insertOne(data);

    return true;
}
