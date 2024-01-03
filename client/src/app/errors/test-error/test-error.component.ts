import { ToastrService } from 'ngx-toastr';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css'],
})
export class TestErrorComponent {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.log(error);
        this.toastr.error(
          error.statusText === 'OK' ? 'Bad Request' : error.statusText,
          error.status
        );
      },
    });
  }
  get500Error() {
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.log(error);
        this.toastr.error(
          error.statusText === 'OK'
            ? 'Internal Server Error'
            : error.statusText,
          error.status
        );
      },
    });
  }
  get401Error() {
    this.http.get(this.baseUrl + 'buggy/auth').subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.log(error);
        this.toastr.error(
          error.statusText === 'OK' ? 'Unauthorized' : error.statusText,
          error.status
        );
      },
    });
  }
  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.log(error);
        this.toastr.error(
          error.statusText === 'OK' ? 'Not Found' : error.statusText,
          error.status
        );
      },
    });
  }
  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        console.log(error);
        this.validationErrors = error;
      },
    });
  }
}
