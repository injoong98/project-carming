package com.carming.backend.place.repository;

import com.carming.backend.place.domain.PlaceTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaceTagRepository extends JpaRepository<PlaceTag, Long> {
}
