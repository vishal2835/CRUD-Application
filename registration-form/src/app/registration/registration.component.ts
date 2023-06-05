import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  student: any = {};

  constructor(private http: HttpClient) { }

  onSubmit() {
    if (this.student.id) {
      // Existing student, update the record
      this.updateStudent();
    } else {
      // New student, add a new record
      this.addStudent();
    }
  }

  addStudent() {
    this.http.post('http://localhost:8090/student', this.student).subscribe(
      (response) => {
        console.log(response);
        alert('Registration successful!');
        this.clearForm();
      },
      (error) => {
        console.error(error);
        let errorMessage = 'Registration failed!';
        if (error.status === 0) {
          errorMessage = 'Cannot connect to the server. Please try again later.';
        } else {
          errorMessage = 'An error occurred during registration. Please try again.';
        }
        alert(errorMessage);
      }
    );
  }

  updateStudent() {
    this.http.post('http://localhost:8090/updatestudent', this.student).subscribe(
      (response) => {
        console.log(response);
        alert('Student updated successfully!');
        this.clearForm();
      },
      (error) => {
        console.error(error);
        let errorMessage = 'Update failed!';
        if (error.status === 0) {
          errorMessage = 'Cannot connect to the server. Please try again later.';
        } else {
          errorMessage = 'An error occurred during update. Please try again.';
        }
        alert(errorMessage);
      }
    );
  }

  clearForm() {
    this.student = {};
  }
}
