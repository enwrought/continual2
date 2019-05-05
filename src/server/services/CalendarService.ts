import { User } from '../entities/User';

export interface CalendarInfo {
  name: string;
  description?: string;
  link: string;
}

export interface EventInfo {
  name: string;
  description?: string;
  start_time: Date;
  end_time: Date;
  location?: string; // TODO: STORY change type
}

export interface CalendarService<S extends CalendarInfo, T extends EventInfo> {
  addCalendar(user: User, calendarInfo: S): Promise<S>;
  refreshCalendar(calendarId: string, token: string): Promise<S>;
  addEvent(calendarId: string, eventInfo: T): Promise<boolean>;
}
