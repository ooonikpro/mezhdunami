const procedures = ref([]);

export const useProcedures = () => {
    useFetch('/api/procedures').then(({ data }) => {
        procedures.value = data.value.data;
    })

    return {
        procedures: readonly(procedures)
    }
}
