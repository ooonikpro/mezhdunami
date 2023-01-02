import axios from 'axios';
import {
  computed, ref, watch,
} from 'vue';
import { createDate, getNextMonth, today } from '@/utils';
import { DateNumber, PatientFormData, ResponseAPI } from '@/types';
import { ADMIN_API_URL, BASE_ADMIN_API_URL } from '@/constants/adminUrls';

const scheduleUrl = BASE_ADMIN_API_URL(ADMIN_API_URL.SCHEDULE);
const nonWorkingDatesUrl = BASE_ADMIN_API_URL(ADMIN_API_URL.NON_WORKING_DATES);

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
    const response: ResponseAPI<DateNumber[]> = await axios.get(`${nonWorkingDatesUrl}?${searchParams.value}`)
      .then((response) => response.data);

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

  const response: ResponseAPI<DateNumber[]> = await axios.post(nonWorkingDatesUrl, {
    dates: Object.keys(newNonWorkingDates).map(Number),
  }).then((response) => response.data);

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
    const response = await axios.get(`${scheduleUrl}?${searchParams.value}`)
      .then((response) => response.data)
      .then(({ data }) => data as PatientFormData[]);

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
    const response = await axios.put(`${scheduleUrl}/${formData._id}`, formData)
      .then((response) => response.data)
      .then(({ data }) => data as boolean);

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
    const response = await axios.delete(`${scheduleUrl}/${formData._id}`)
      .then((response) => response.data)
      .then(({ data }) => data as boolean);

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

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    fetchNonWorkingDates();
    fetchSchedule();
  }
});

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
