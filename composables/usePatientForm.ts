const form = {
    state: reactive({}),
    initialized: ref(false)
}

export const usePatientForm = () => {
    const { get, set } = useStore();

    const getInitialFormState = (): Tech.PatientFormData => ({
        name: get('name') || '',
        phone: get('phone') || '',
        procedures: null,
        date: null,
        notify: false,
        typeOfNotify: 1,
    });

    const init = () => {
        form.state = reactive(getInitialFormState());
    }

    if (!form.initialized.value) {
        init();
        form.initialized.value = true;
    }

    const savePatient = () => {
        const formData = form.state as Tech.PatientFormData;

        set('phone', formData.phone);
        set('name', formData.name);
    }

    return {
        state: form.state as Tech.PatientFormData,
        reset: init,
        savePatient
    };
}
