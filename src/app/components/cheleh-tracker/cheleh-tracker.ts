import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChelehStats, Day, DayStatus, GradeData} from './cheleh.model';
import {FailureModal} from '../failure-modal/failure-modal';

@Component({
  selector: 'app-cheleh-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cheleh-tracker.html',
  styleUrls: ['./cheleh-tracker.scss']
})
export class ChelehTrackerComponent {
  days: Day[] = [];
  daysSelected: Day[] = [];
  showFailureModal = false;
  showCongratulationModal = false;
  currentStats!: ChelehStats;
  currentGrade!: GradeData;

  habitName = 'مطالعه کتاب';
  habitLevel = '5 دقیقه';

  constructor() {
    this.initializeDays();
  }

  initializeDays(): void {
    this.days = Array.from({ length: 40 }, (_, i) => ({
      dayNumber: i + 1,
      status: DayStatus.EMPTY

    }));
  }

  onDayClick(day: Day): void {
    if (day.dayNumber > 1) {
      const previousDay = this.days.find(d => d.dayNumber === day.dayNumber - 1);

      if (previousDay && previousDay.status === DayStatus.EMPTY) {
        alert('اول روز قبلی رو فعال کن ⏳');
        return;
      }
    }

    const statusOrder = [
      DayStatus.EMPTY,
      DayStatus.COMPLETE,
      DayStatus.EMERGENCY,
      DayStatus.SPECIAL
    ];
    const currentIndex = statusOrder.indexOf(day.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    day.status = statusOrder[nextIndex];




    if (day.status === DayStatus.EMPTY){
      this.daysSelected = this.daysSelected.filter(day => day.status !== DayStatus.EMPTY);
      return;
    }

    const alreadyExists = this.daysSelected.some(d => d.dayNumber === day.dayNumber);

    if (!alreadyExists) {
      this.daysSelected.push(day);
    } else {
      // اگر وجود دارد، فقط وضعیتش را به‌روزرسانی کنیم (بدون افزودن)
      this.daysSelected = this.daysSelected.map(d =>
        d.dayNumber === day.dayNumber ? day : d
      );
    }

    console.log('Day clicked:', this.daysSelected);

  }

  getStats(): ChelehStats {
    const stats = this.days.reduce(
      (acc, day) => {
        if (day.status !== DayStatus.EMPTY) acc.totalDays++;
        if (day.status === DayStatus.COMPLETE) acc.completeDays++;
        if (day.status === DayStatus.EMERGENCY) acc.emergencyDays++;
        if (day.status === DayStatus.SPECIAL) acc.specialDays++;
        return acc;
      },
      { totalDays: 0, completeDays: 0, emergencyDays: 0, specialDays: 0 }
    );
    return stats;
  }

  calculateGrade(): GradeData {
    const stats = this.getStats();
    const weightedSum =
      stats.completeDays * 1.0 +
      stats.emergencyDays * 0.7 +
      stats.specialDays * 0.4;
    const percentage = Math.round((weightedSum / 40) * 100);

    let grade = 'F';
    let message = '';

    if (percentage >= 90) {
      grade = 'A+';
      message = 'عالی! عملکرد فوق‌العاده‌ای داشتی! 🌟';
    } else if (percentage >= 80) {
      grade = 'A';
      message = 'خیلی خوب! کار درستی انجام دادی! 👏';
    } else if (percentage >= 70) {
      grade = 'B';
      message = 'خوب است! ولی می‌تونی بهتر باشی! 💪';
    } else if (percentage >= 60) {
      grade = 'C';
      message = 'قابل قبول، اما نیاز به تلاش بیشتر! 📈';
    } else {
      grade = 'D';
      message = 'نیاز به بازنگری و تلاش مجدد! 🔄';
    }

    return { percentage, grade, message };
  }

  onFailureClick(): void {
    // ✅ این خط رو اضافه کن
    console.log('دکمه "از دست دادم" کلیک شد! مقدار showFailureModal الان:', !this.showFailureModal, 'است و به true تغییر می‌کند.');
    this.showFailureModal = true;
  }

  handleFailureSubmit(reason: string): void {
    console.log('Failure reason:', reason);
    this.resetTracker();
    this.showFailureModal = false;
  }

  onFailureCancel(): void {
    this.showFailureModal = false;
  }

  onCompleteCheleh(): void {
    const stats = this.getStats();
    if (stats.totalDays >= 40) {
      this.currentStats = stats;
      this.currentGrade = this.calculateGrade();
      this.showCongratulationModal = true;
    }
  }

  handleCongratulationClose(shouldContinue: boolean): void {
    this.showCongratulationModal = false;
    if (shouldContinue) {
      this.resetTracker();
      console.log('Moving to next Cheleh...');
    }
  }

  resetTracker(): void {
    this.initializeDays();
  }

  // این تابع رو در فایل .ts خودت به‌روز کن
  getDayClass(day: Day): string {
    // فقط نام وضعیت رو برمیگردونیم چون استایل‌ها بر اساس اون اعمال میشه
    return day.status.toLowerCase();
  }


  getDayIcon(day: Day): string {
    switch (day.status) {
      case DayStatus.COMPLETE:
        return '✅';
      case DayStatus.EMERGENCY:
        return '🚫';
      case DayStatus.SPECIAL:
        return '❌';
      default:
        return '';
    }
  }

  getProgressBarStyle(): any {
    const stats = this.getStats();
    return {
      '--complete-width': `${(stats.completeDays / 40) * 100}%`,
      '--emergency-width': `${(stats.emergencyDays / 40) * 100}%`,
      '--special-width': `${(stats.specialDays / 40) * 100}%`
    };
  }

  isCompleteChelehDisabled(): boolean {
    return this.getStats().totalDays < 40;
  }

  protected readonly DayStatus = DayStatus;
}
