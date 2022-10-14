import fs from 'fs';

const FILE_PATH = './server/api/__mocks/procedureList.json';

const getProcedures = () => JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

const setProcedures = (obj) => new Promise((resolve, reject) => {
    const data = getProcedures();

    const id = data.data.at(-1).id + 1;

    data.data.push({
        id,
        ...obj
    });

    fs.writeFileSync(FILE_PATH, JSON.stringify(data), 'utf-8');

    resolve(true);
})

export default defineEventHandler(async (event) => {
    const formData = await useBody(event);

    return setProcedures(formData);
});
