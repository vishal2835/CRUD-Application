import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router // Add the Router module here
  ) {}
  ngOnInit() {
    this.http.get('http://localhost:8090/students').subscribe(
      (response: any) => {
        console.log(response);
        this.students = response as any[];
      },
      (error) => {
        console.error(error);
      }
    );
  }

  fetchStudents() {
    this.http.get('http://localhost:8090/students').subscribe(
      (response: any) => {
        console.log(response);
        this.students = response as any[];
      },
      (error) => {
        console.error(error);
      }
    );
  }
  deleteStudent(studentId: number) {
    this.http.delete(`http://localhost:8090/student/${studentId}`).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.fetchStudents(); // Refresh the student list after deletion
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  editStudent(student: any) {
    this.router.navigate(['/edit-student', student.id]); // Navigate to the edit student component with the student ID as a parameter
  }

}
