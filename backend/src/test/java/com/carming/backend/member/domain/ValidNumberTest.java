package com.carming.backend.member.domain;

import org.junit.jupiter.api.Test;

import java.util.UUID;

class ValidNumberTest {

    @Test
    void 적당한_UUID_만들기() {
        String good = UUID.nameUUIDFromBytes("good".getBytes()).toString();
        String substring = good.substring(0, 8);

        System.out.println(good);
        System.out.println(substring);
    }

}