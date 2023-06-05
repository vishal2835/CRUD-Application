import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-edit-student',
    templateUrl: './edit-student.component.html',
    styleUrls: ['./edit-student.component.css']
})


export class EditStudentComponent implements OnInit {
    student: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
          const studentId = +params['id'];
          this.fetchStudent(studentId);
        });
      }

    updateName(name: string) {
        this.student.name = name;
    }



    fetchStudent(studentId: number) {
        this.http.get(`http://localhost:8090/student/${studentId}`).subscribe(
            (response: any) => {
                console.log(response);
                this.student = response;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    updateStudent() {
        this.http.post('http://localhost:8090/updatestudent', this.student).subscribe(
            () => {
                console.log('Student updated successfully');
                this.router.navigate(['/students']); // Navigate back to the student list
            },
            (error) => {
                console.error(error);
            }
        );
    }
    onSave() {
        if (this.student) {
            this.http.post(`http://localhost:8090/updatestudent`, this.student).subscribe(
                (response) => {
                    console.log(response);
                    alert('Student details updated successfully!');
                    this.router.navigate(['/students']); // Redirect to student list
                },
                (error) => {
                    console.error(error);
                    alert('An error occurred while updating student details. Please try again.');
                }
            );
        }
    }
    onUpdate() {
        this.http.post('http://localhost:8090/updatestudent', this.student).subscribe(
          (response) => {
            console.log(response);
            alert('Student details updated successfully!');
            this.router.navigate(['/students']); // Navigate back to student list
          },
          (error) => {
            console.error(error);
            alert('An error occurred while updating student details. Please try again.');
          }
        );
      }
    
      onDelete() {
        if (confirm('Are you sure you want to delete this student?')) {
          const studentId = this.student.id;
          this.http.delete('http://localhost:8090/student/' + studentId).subscribe(
            (response) => {
              console.log(response);
              alert('Student deleted successfully!');
              this.router.navigate(['/students']); // Navigate back to student list
            },
            (error) => {
              console.error(error);
              alert('An error occurred while deleting student. Please try again.');
            }
          );
        }
      }
      
      
   
}
