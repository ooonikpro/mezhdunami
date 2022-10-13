export default defineEventHandler((event) => {
    return import('./__mocks/procedureList.json').then(data => data.default);
});
