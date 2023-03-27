package com.carming.backend.course.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "course")
@Entity
public class Course {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    @Column(name = "course_places")
    private String places;

    @Column(name = "course_regions")
    private String regions;

    @Column(name = "course_name")
    private String name;

    @Builder
    public Course(Long id, String places, String regions, String name) {
        this.id = id;
        this.places = places;
        this.regions = regions;
        this.name = name;
    }
}
