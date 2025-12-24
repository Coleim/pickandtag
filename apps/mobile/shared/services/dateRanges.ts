
export function getToday(): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function getYesterdayRange(): { from: Date, to: Date } {
  const from = new Date();
  from.setDate(from.getDate() - 1);
  from.setHours(0, 0, 0, 0);
  const to = new Date(from);
  to.setDate(to.getDate() + 1);
  return { from, to };
}

export function getThisWeek(): Date {
  const lastMonday = new Date();
  const day = lastMonday.getDay();
  lastMonday.setDate(lastMonday.getDate() - day + 1);
  lastMonday.setHours(0, 0, 0, 0);
  return lastMonday;
}

export function getLastWeek(): { from: Date; to: Date } {
  const to = getThisWeek();

  const from = new Date(to);
  from.setDate(to.getDate() - 7);

  return { from, to };
}

export function getThisMonth(): Date {
  const now = new Date();
  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  return now;
}

export function getLastMonth(): { from: Date, to: Date } {
  const to = new Date();
  to.setDate(1);
  to.setHours(0, 0, 0, 0);

  const from = new Date(to.getFullYear(), to.getMonth() - 1, 1);
  from.setHours(0, 0, 0, 0);

  return { from, to };
}
