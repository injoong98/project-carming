package com.carming.backend.member.repository;

import com.carming.backend.member.domain.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
