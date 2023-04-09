package com.carming.backend.member.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "card")
@Entity

public class Card {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id")
    private Long id;

    @Column(name = "card_number")
    private String number;

    @Column(name = "card_cvv")
    private String cvv;

    @Column(name = "card_expired_date")
    private String expiredDate;

    @Column(name = "card_password")
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "card_company_name")
    private CardCompany companyName;

    @Builder
    public Card(String number, String cvv, String expiredDate,
                String password, CardCompany companyName) {
        this.number = number;
        this.cvv = cvv;
        this.expiredDate = expiredDate;
        this.password = password;
        this.companyName = companyName;
    }
}
