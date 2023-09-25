import { Injectable } from '@nestjs/common';
import { add, format, isWeekend } from 'date-fns';
import { myConstants } from './myConstants';

@Injectable()
export class MyFunctionsService {
  constructor() {}

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
  }
}
