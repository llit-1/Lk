export interface User {
    surname: string;
    name: string;
    patronymic: string;
    birthday: string;  // Если дата приходит в виде строки
    jobTitle: string;
    location: string;
    scheduleStart: string;
    scheduleEnd: string;
    entity: string;
    experience: number;
  }