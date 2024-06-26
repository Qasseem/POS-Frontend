import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { take } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ToastService } from 'src/app/core/services/toaster.service';
import { RegexPatterns } from 'src/app/core/shared/core/patterns/regex-patterns';

@Component({
  selector: 'oc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private storage: StorageService,
    private router: Router,
    private toastService: ToastService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.pattern(RegexPatterns.Email)],
      ],
    });
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  get email() {
    return this.form.get('email');
  }

  onSubmit() {
    this.spinner.show();
    this.authService
      .forgotPassword({ email: this.form.controls['email'].value })
      .pipe(take(1))
      .subscribe(
        (resp) => {
          this.spinner.hide();
          if (resp.success) {
            this.toastService.showSuccess(
              this.translate.instant('Register.forgotPasswordMesssage')
            );
            this.goToLoginPage();
          }
        },
        (error) => {
          this.spinner.hide();
        }
      );
  }
}
