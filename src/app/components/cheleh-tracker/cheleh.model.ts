export enum DayStatus {
  EMPTY = 'EMPTY',
  COMPLETE = 'COMPLETE',
  EMERGENCY = 'EMERGENCY',
  SPECIAL = 'SPECIAL'
}

export interface Day {
  dayNumber: number;
  status: DayStatus;
}

export interface ChelehStats {
  totalDays: number;
  completeDays: number;
  emergencyDays: number;
  specialDays: number;
}

export interface GradeData {
  percentage: number;
  grade: string;
  message: string;
}
