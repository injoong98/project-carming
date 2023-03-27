package com.carming.backend.common.aop.timer;

public class JavaTimer implements Timer {

    @Override
    public Long start() {
        return System.currentTimeMillis();
    }

    @Override
    public Long getElapsedTime(Long startTime) {
        return stop() - startTime;
    }

    private long stop() {
        return System.currentTimeMillis();
    }
}
