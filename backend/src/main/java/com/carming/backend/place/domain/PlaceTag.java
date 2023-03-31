package com.carming.backend.place.domain;

import com.carming.backend.tag.domain.Tag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "place_tag")
@Entity
public class PlaceTag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "place_tag_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;

    public PlaceTag(Place place, Tag tag) {
        this.place = place;
        this.tag = tag;
    }
}
