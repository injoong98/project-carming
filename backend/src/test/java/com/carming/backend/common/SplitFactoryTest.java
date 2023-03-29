package com.carming.backend.common;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;

class SplitFactoryTest {

    @Test
    @DisplayName("split 이후 List<String>으로 넘겨준다.")
    void split() {
        //given
        String regions = "은평구|용산구|관악구";
        String places = "1|5|7|11";
        String birthday = "1992/02/06";

        List<String> regionList = SplitFactory.split(regions, "\\|");
        List<String> placeList = SplitFactory.split(places, "\\|");
        List<String> birthdayList = SplitFactory.split(birthday, "/");

        assertThat(regionList.size()).isEqualTo(3);
        assertThat(regionList.get(0)).isEqualTo("은평구");
        assertThat(placeList.size()).isEqualTo(4);
        assertThat(placeList.get(0)).isEqualTo("1");
        assertThat(birthdayList.size()).isEqualTo(3);
        assertThat(birthdayList.get(0)).isEqualTo("1992");
    }


    @Test
    @Disabled
    @DisplayName("mapToLong().boxed() 와 map(Long::valueOf) 비교: [유의미한 차이 X]")
    void mapToLong_and_map() {
        //given
        List<String> strings = getStringList(1_000_000_0);

        long start_mapToLong = System.currentTimeMillis();
        strings.stream().mapToLong(Long::parseLong)
                .boxed()
                .collect(Collectors.toList());
        Long mapToLong = System.currentTimeMillis() - start_mapToLong;

        long start_map = System.currentTimeMillis();
        strings.stream().map(Long::valueOf)
                .collect(Collectors.toList());
        long map = System.currentTimeMillis() - start_map;
    }

    private List<String> getStringList(int size) {
        List<String> strings = new ArrayList<>(1_000_000_0);
        for (int i = 0; i < size; i++) {
            strings.add(String.valueOf(i));
        }
        return strings;
    }


}