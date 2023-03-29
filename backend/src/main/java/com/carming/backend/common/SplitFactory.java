package com.carming.backend.common;

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
