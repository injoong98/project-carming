package com.carming.backend.member.repository;

import com.carming.backend.member.domain.Member;

import java.util.Optional;

public interface MemberRepositoryCustom {

    Optional<Member> findByPhone(String phoneNumber); //Login에 사용

    Optional<String> findNickname(String nickname);
}
