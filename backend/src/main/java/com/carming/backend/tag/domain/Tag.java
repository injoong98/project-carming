package com.carming.backend.tag.domain;

import lombok.AccessLevel;
import lombok.Builder;
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
    private Category category;

    @Builder
    public Tag(String name, Category category) {
        this.name = name;
        this.category = category;
    }
}
