package com.carming.backend.common.aop.timer;

public interface Timer {
    Long start();

    Long getElapsedTime(Long startTime);
}
