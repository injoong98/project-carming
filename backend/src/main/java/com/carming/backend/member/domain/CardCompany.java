package com.carming.backend.member.domain;

import com.carming.backend.common.enum_util.EnumModel;

public enum CardCompany implements EnumModel {

    IBK_BC("기업BC", "기업", "3K"),
    GWANGJUBANK("광주은행", "광주", "46"),
    LOTTE("롯데카드", "롯데", "71"),
    KDBBANK("KDB산업은행", "산업", "30"),
    BC("BC카드", "비씨", "31"),
    SAMSUNG("삼성카드", "삼성", "51"),
    SAEMAUL("새마을금고", "새마을", "38"),
    SHINHAN("신한카드", "신한", "41"),
    SHINHYEOP("신협", "신협", "62"),
    CITI("씨티카드", "씨티", "36"),
    WOORI("우리카드", "우리", "33"),
    POST("우체국예금보험", "우체국", "37"),
    SAVINGBANK("저축은행중앙회", "저축", "39"),
    JEONBUKBANK("전북은행", "전북", "35"),
    JEJUBANK("제주은행", "제주", "42"),
    KAKAOBANK("카카오뱅크", "카카오뱅크", "15"),
    KBANK("케이뱅크", "케이뱅크", "3A"),
    TOSSBANK("토스뱅크", "토스뱅크", "24"),
    HANA("하나카드", "하나", "21"),
    HYUNDAI("현대카드", "현대", "61"),
    KOOKMIN("KB국민카드", "국민", "11"),
    NONGHYEOP("NH농협카드", "농협", "91"),
    SUHYEOP("Sh수협은행", "수협", "34");
    private String fullName;

    private String shortName;

    private String code;

    CardCompany(String fullName, String shortName, String code) {
        this.fullName = fullName;
        this.shortName = shortName;
        this.code = code;
    }


    @Override
    public String getKey() {
        return name();
    }

    @Override
    public String getValue() {
        return shortName;
    }
}
