package com.carming.backend.place.repository;

import com.carming.backend.place.domain.Place;
import com.carming.backend.place.domain.PlaceCategory;
import com.carming.backend.place.dto.request.PlaceSearch;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.carming.backend.place.domain.QPlace.place;
import static com.carming.backend.place.domain.QPlaceTag.placeTag;
import static com.carming.backend.tag.domain.QTag.tag;

@RequiredArgsConstructor
public class PlaceRepositoryImpl implements PlaceRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<Place> getPlaces(PlaceSearch search) {

        return queryFactory
                .selectFrom(place)
                .where(regionEq(search.getRegions()), categoryEq(search.getCategory()))
                .orderBy(place.ratingSum.desc())
                .limit(search.getSize())
                .fetch();
    }

    public void getPlaceTag(Long id) {
        queryFactory
                .select(placeTag.count())
                .from(placeTag)
                .join(placeTag.tag, tag).fetchJoin()
                .join(placeTag.place, place).fetchJoin()
                .groupBy(placeTag.tag)
                .where(placeTag.place.id.eq(id))
                .fetch();
    }

    private BooleanExpression regionEq(List<String> regions) {
        if (regions.isEmpty()) {
            return null;
        }
        return place.region.in(regions);
    }

    private BooleanExpression categoryEq(String category) {
        if (!StringUtils.hasText(category)) { //category == null || category.equals("")
            return null;
        }

        try {
            return place.category.eq(PlaceCategory.valueOf(category.toUpperCase()));
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
