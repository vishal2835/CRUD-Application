package com.Student.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.Student.Model.Student;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Integer> {

    List<Student> findAll();
    Student findById(int id);

}
