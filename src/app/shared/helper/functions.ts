export function preCreate(data:any){
    data.createdAt = new Date();
    data.createdBy = 'Dela';
    data.deleted = false;
    return data;
}

export function preUpdate(data:any){
    data.updatedAt = new Date();
    data.updatedBy = 'Dela';
    return data;
}

export function getMonthName(monthNumber: number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'short' });
}