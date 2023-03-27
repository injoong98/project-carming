package com.carming.backend.common.aop.timer;

import org.springframework.stereotype.Component;
import org.springframework.util.StopWatch;

@Component
public class SpringTimer implements Timer {

    private StopWatch stopWatch = new StopWatch();

    @Override
    public Long start() {
        stopWatch.start();
        return null;
    }

    @Override
    public Long getElapsedTime(Long startTime) {
        stopWatch.stop();
        long elapsedTime = stopWatch.getTotalTimeMillis();
        return elapsedTime;
    }
}
