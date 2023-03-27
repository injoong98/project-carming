package com.carming.backend.member.domain;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "member")
@Entity

public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(name = "member_phone_number")
    private String phoneNumber;

    @Column(name = "member_password")
    private String password;

    @Column(name = "member_nickname")
    private String nickname;

    @Column(name = "member_name")
    private String name;

    @Column(name = "member_birthday")
    private LocalDate birthday;

    @Builder
    public Member(String phoneNumber, String password,
                  String nickname, String name,
                  LocalDate birthday) {
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.nickname = nickname;
        this.name = name;
        this.birthday = birthday;
    }
}
