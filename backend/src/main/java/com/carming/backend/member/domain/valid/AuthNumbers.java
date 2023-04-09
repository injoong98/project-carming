package com.carming.backend.member.domain.valid;

import java.util.List;

public class AuthNumbers {

    private static final int AUTH_NUMBERS_SIZE = 6;

    List<Integer> authNumbers;

    public AuthNumbers(List<Integer> numbers) {
        validSize(numbers);
        this.authNumbers = numbers;
    }

    public String getAuthNumbers() {
        return authNumbers.stream()
                .map(String::valueOf)
                .reduce((x, y) -> x + y)
                .orElseThrow(() -> new RuntimeException("인증번호가 존재하지 않습니다."));
    }

    private void validSize(List<Integer> numbers) {
        if (numbers.size() != AUTH_NUMBERS_SIZE) {
            throw new IllegalArgumentException("인증번호는 6자리여야 합니다.");
        }
    }
}
