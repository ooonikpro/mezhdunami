import { getBookedDates, getNotWorkingDates } from '@/server/db/collections';

export const getShedules = async () => {
  try {
    const notWorkingDates = await getNotWorkingDates();
    const bookedDates = await getBookedDates();

    return {
      data: {
        excludedDates: [...notWorkingDates, ...bookedDates].sort(),
      },
      success: true,
    };
  } catch (e) {
    console.log(e);

    return {
      data: [],
      success: false,
      message: e,
    };
  }
};
