const getInitialFormState = (): PatientFormData => ({
    name: '',
    phone: '',
    procedures: null,
    date: null,
    notify: false,
    typeOfNotify: 1,
});

const form = {
    state: reactive(getInitialFormState()),
}

export const usePatientForm = () => {
    const { addToSchedule } = useSchedules();
    const { set, get } = useStore();

    const init = () => {
        form.state = reactive(getInitialFormState());
    }

    const restorePatient = () => {
        form.state.name = get('name');
        form.state.phone = get('phone');
    }

    const submit = () => {
        set("name", form.state.name);
        set("phone", form.state.phone);

        return addToSchedule(form.state);
    }

    onBeforeMount(restorePatient);

    return {
        state: form.state as PatientFormData,
        reset: init,
        submit
    };
}
