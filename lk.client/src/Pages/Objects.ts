type Status = {
    label: string;
    color: string;
  };

export const statuses: Record<number, Status> = {
    1: {
        label:"Ожидается",
        color: "#CBD915"
    },
    2: {
        label:"Отменена",
        color: "gray"
    },
    3: {
        label:"Не выполнена",
        color: "red"
    },
    4: {
        label:"Выполнена",
        color: "green"
    },
    5: {
        label:"Оплачена",
        color: "green"
    },
}

