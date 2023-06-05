package com.Student.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.Student.Model.Student;
import com.Student.Repository.StudentRepository;

import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {

	@Autowired
	StudentRepository studentRepository;

	// check the api's working correctly api
	@RequestMapping(value = "/ping", method = RequestMethod.GET)
	@ResponseBody
	public String healthCheck() {
		return "This is working well";
	}

	@RequestMapping(value = "/students", method = RequestMethod.GET)
	@ResponseBody
	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

	@RequestMapping(value = "/student", method = RequestMethod.POST)
	@ResponseBody
	public Student addStudent(@RequestBody Student student) {
		return studentRepository.save(student);
	}

	@RequestMapping(value = "/findstudent", method = RequestMethod.GET)
	@ResponseBody
	public Student findStudent(@RequestParam("studentId") int studentId) {
		return studentRepository.findById(studentId);
	}

	@RequestMapping(value = "/updatestudent", method = RequestMethod.POST)
	@ResponseBody
	public Student updateStudent(@RequestBody Student student) {
		return studentRepository.save(student);
	}

	@RequestMapping(value = "/deletestudent", method = RequestMethod.GET)
	@ResponseBody
	public void deleteStudent(@RequestParam("studentId") int studentId) {
		studentRepository.deleteById(studentId);
	}

	@RequestMapping(value = "/error", method = RequestMethod.GET)
	public String error() {
		return "Error handing";
	}

}