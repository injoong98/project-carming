package com.carming.backend.tag.domain;

import com.carming.backend.place.domain.PlaceCategory;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tag")
@Entity
public class Tag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    @Column(name = "tag_name")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "tag_category")
    private PlaceCategory category;
}
