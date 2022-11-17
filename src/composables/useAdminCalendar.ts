import {
  computed, ref, watch, readonly,
} from 'vue';
import { createDate, getNextMonth, today } from '@/utils';
import { DateNumber, PatientFormData, ResponseAPI } from '@/types';

const createUrl = (collection: string) => `/api/admin/${collection}`;
const scheduleUrl = createUrl('schedules');
const nonWorkingDatesUrl = createUrl('non-working-dates');

const from = ref(createDate(today));
const until = ref(getNextMonth());
const nonWorkingDates = ref<Record<DateNumber, 1>>({});
const schedule = ref<Record<DateNumber, PatientFormData>>({});

const searchParams = computed(() => {
  const searchData = new URLSearchParams();
  searchData.append('from', String(from.value.getTime()));
  searchData.append('until', String(until.value.getTime()));

  return searchData;
});

const setNonWorkingDates = (val: Record<DateNumber, 1>) => {
  nonWorkingDates.value = val;
};

const setSchedule = (val: Record<DateNumber, PatientFormData>) => {
  schedule.value = val;
};

const fetchNonWorkingDates = async () => {
  try {
    const response: ResponseAPI<DateNumber[]> = await fetch(`${nonWorkingDatesUrl}?${searchParams.value}`)
      .then((res) => res.json());

    if (response.success) {
      response.data.forEach((date) => {
        nonWorkingDates.value[date] = 1;
      });
    } else {
      throw new Error(response.message);
    }
  } catch (e) {
    console.error(e);
  }
};

const onUpdateNonWorkingDates = async (selectedDates: DateNumber[]) => {
  const newNonWorkingDates = { ...nonWorkingDates.value };
  const dates = selectedDates;

  for (let i = 0; i < dates.length; i++) {
    if (newNonWorkingDates.hasOwnProperty(dates[i])) {
      delete newNonWorkingDates[dates[i]];
    } else {
      newNonWorkingDates[dates[i]] = 1;
    }
  }

  const response: ResponseAPI<DateNumber[]> = await fetch(nonWorkingDatesUrl, {
    method: 'POST',
    body: JSON.stringify({
      dates: Object.keys(newNonWorkingDates).map(Number),
    }),
  }).then((res) => res.json());

  if (response.success) {
    setNonWorkingDates(newNonWorkingDates);
    fetchNonWorkingDates();

    return true;
  }

  throw new Error(response.message);
};

const fetchSchedule = async () => {
  try {
    const newSchedule: Record<DateNumber, PatientFormData> = {};
    const response = await fetch(`${scheduleUrl}?${searchParams.value}`).then((response) => response.json()).then(({ data }) => data as PatientFormData[]);

    response.forEach((item) => {
      newSchedule[item.date] = item;
    });

    setSchedule(newSchedule);
  } catch (e) {
    console.error(e);
  }
};

const onUpdateScheduleItem = async (formData: PatientFormData) => {
  try {
    // eslint-disable-next-line
    const response = await fetch(`${scheduleUrl}/${formData._id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then(({ data }) => data as boolean);

    if (response) {
      schedule.value[formData.date] = formData;

      fetchSchedule();
    }
  } catch (e) {
    console.error(e);
  }
};

const onDeleteScheduleItem = async (formData: PatientFormData) => {
  try {
    // eslint-disable-next-line
    const response = await fetch(`${scheduleUrl}/${formData._id}`, {
      method: 'DELETE',
    }).then((response) => response.json()).then(({ data }) => data as boolean);

    if (response) {
      fetchSchedule();
    }
  } catch (e) {
    console.error(e);
  }
};

watch([from, until], () => {
  fetchNonWorkingDates();
  fetchSchedule();
}, { immediate: true });

export const useAdminCalendar = () => ({
  from,
  until,
  nonWorkingDates,
  schedule,

  setNonWorkingDates,
  setSchedule,
  onUpdateScheduleItem,
  onDeleteScheduleItem,
  onUpdateNonWorkingDates,
});
