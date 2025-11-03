// src/app/components/failure-modal/failure-modal.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // برای استفاده از ngModel

@Component({
  selector: 'app-failure-modal',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule رو اضافه کن
  template: `
    <div class="modal-backdrop">
      <div class="modal-content">
        <h2>ثبت شکست</h2>
        <p>متاسفیم! چرا امروز موفق نشدی؟ (اختیاری)</p>
        <textarea [(ngModel)]="reason" placeholder="مثلا: خیلی خسته بودم..."></textarea>
        <div class="modal-actions">
          <button (click)="onSubmit()">ثبت شکست و ریست</button>
          <button (click)="onCancel()">انصراف</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./failure-modal.scss']
})
export class FailureModal {
  // ✅ مرحله ۱: تعریف Output ها
  @Output() submitFailure = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>(); // cancel هیچ دیتایی نمی‌فرسته

  reason: string = ''; // برای ذخیره متن داخل textarea

  // ✅ مرحله ۲: ساخت توابع برای ارسال Event ها
  onSubmit(): void {
    // متن دلیل شکست رو به مادر می‌فرستیم
    this.submitFailure.emit(this.reason);
  }

  onCancel(): void {
    // فقط خبر می‌دیم که کنسل شده
    this.cancel.emit();
  }
}
