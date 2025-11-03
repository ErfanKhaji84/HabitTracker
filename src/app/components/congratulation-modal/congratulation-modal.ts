// src/app/components/congratulation-modal/congratulation-modal.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChelehStats, GradeData } from '../cheleh-tracker/cheleh.model'; // مسیر رو چک کن

@Component({
  selector: 'app-congratulation-modal',
  standalone: true,
  imports: [CommonModule],
  // فرض می‌کنیم یک فایل HTML ساده برای این مودال داری
  template: `
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>{{ grade?.grade }} - {{ grade?.percentage }}%</h2>
        <p>{{ grade?.message }}</p>
        <div class="stats-summary">
          <div>تکمیل: {{ stats?.completeDays }}</div>
          <div>اضطراری: {{ stats?.emergencyDays }}</div>
          <div>ویژه: {{ stats?.specialDays }}</div>
        </div>
        <div class="modal-actions">
          <button (click)="onClose(true)">شروع چله بعدی</button>
          <button (click)="onClose(false)">بستن</button>
        </div>
      </div>
    </div>
  `,
  // و استایل‌های مربوطه
  styleUrls: ['./congratulation-modal.scss']
})
export class CongratulationModal {
  // ✅ مرحله ۱: تعریف Input ها برای دریافت دیتا از کامپوننت مادر
  @Input() stats: ChelehStats | null = null;
  @Input() grade: GradeData | null = null;

  // ✅ مرحله ۲: تعریف Output برای فرستادن دیتا به کامپوننت مادر
  // اینجا مشخص می‌کنیم که این Event یک مقدار boolean همراه خودش داره
  @Output() close = new EventEmitter<boolean>();

  // ✅ مرحله ۳: ساخت تابع برای ارسال Event
  onClose(shouldContinue: boolean): void {
    // اینجا مقدار true یا false رو به کامپوننت مادر می‌فرستیم
    this.close.emit(shouldContinue);
  }
}
