package com.carming.backend.common;

import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class SplitFactory {

    public static List<String> split(String target, String regex) {
        return Arrays.stream(target.split(regex)).collect(Collectors.toList());
    }

    public static List<String> splitRegions(String regions) {
        return split(regions, "\\|");
    }

    public static List<String> splitKeyword(String keyword) {
        if (StringUtils.hasText(keyword)) {
            return split(keyword, "\\|");
        }
        return List.of();
    }

    public static List<Long> splitPlaces(String places) {
        return split(places, "\\|").stream()
                .mapToLong(Long::parseLong)
                .boxed()
                .collect(Collectors.toList());
    }

    public static List<String> splitBirthday(String birthday) {
        return split(birthday, "/");
    }

}
