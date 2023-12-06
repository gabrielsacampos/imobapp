import { add, format, isWeekend } from 'date-fns';
import { myConstants } from './myConstants';

export const dateFunctions = {
  defineCreditDate(stringDate: string) {
    const paymentDate = new Date(stringDate);
    let validDaysPast = 0;

    let next = paymentDate;
    let nextDayString: string;

    while (validDaysPast < myConstants.bankAditionalWorkDays) {
      next = add(next, { days: 1 });
      next = add(next, { hours: 3 });

      // between the datetime 00:00 and 02:00, all date's methods consider the day before the input. (time zone issue)
      nextDayString = format(next, 'yyyy-MM-dd');
      // we need to get the string format, otherwise the method .includes() wont match with a holiday

      const isHoliday = myConstants.bankHolidays.includes(nextDayString);
      const isWeekendDay = isWeekend(next);

      /*
	if next day counts (not holiday and not weekend), its a valid day past
	if it does not, we dont count so we join the loop again adding to next (checking one day more)
	if we get inside "if" for the second time it means we are were we want (second valid day) so we dont join the loop again and return
	*/
      if (!isHoliday && !isWeekendDay) {
        validDaysPast++;
      }

      next = add(next, { hours: -3 });
      // after formating date time, removing 3 hours, otherwise the loop could add more than 24h and, consequently, add more 1 day.
    }
    next = add(next, { hours: 3 });
    nextDayString = format(next, 'yyyy-MM-dd');
    // giving the datetime +3h so we can format properly.

    return nextDayString;
  },

  formatToUS(date_string: string) {
    let date = new Date(date_string);
    date = add(date, { hours: 3 });
    const usDate = format(date, 'yyyy-MM-dd');
    return usDate;
  },
  formatToBr(date_string: string) {
    let date = new Date(date_string);
    date = add(date, { hours: 3 });
    const brDate = format(date, 'dd-MM-yyyy');
    return brDate;
  },

  monthStringFormatBR(date: string | Date): string {
    let dateReference = new Date(date);
    dateReference = add(dateReference, { hours: 3 });

    const month_number = dateReference.getMonth();
    const year = dateReference.getFullYear();

    let month: string;
    switch (month_number) {
      case 0:
        month = 'janeiro';
        break;
      case 1:
        month = 'fevereiro';
        break;
      case 2:
        month = 'março';
        break;
      case 3:
        month = 'abril';
        break;
      case 4:
        month = 'maio';
        break;
      case 5:
        month = 'junho';
        break;
      case 6:
        month = 'julho';
        break;
      case 7:
        month = 'agosto';
        break;
      case 8:
        month = 'setembro';
        break;
      case 9:
        month = 'outubro';
        break;
      case 10:
        month = 'novembro';
        break;
      case 11:
        month = 'dezembro';
        break;
    }

    return `${month}/${year}`;
  },
};
