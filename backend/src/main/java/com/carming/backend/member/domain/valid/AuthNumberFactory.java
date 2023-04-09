package com.carming.backend.member.domain.valid;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class AuthNumberFactory {

    private static final int AUTH_NUMBERS_RANGE = 10;
    private static final int AUTH_NUMBERS_SIZE = 6;

    private static final Random random = new Random();

    public static AuthNumbers createValidNumbers() {
        List<Integer> numbers = pickNumbers(AUTH_NUMBERS_RANGE, AUTH_NUMBERS_SIZE);
        return new AuthNumbers(numbers);
    }

    private static List<Integer> pickNumbers(int range, int count) {
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            int number = random.nextInt(range);
            numbers.add(number);
        }
        return numbers;
    }
}
