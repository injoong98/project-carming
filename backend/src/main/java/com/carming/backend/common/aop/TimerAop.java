package com.carming.backend.common.aop;

import com.carming.backend.common.aop.timer.Timer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.lang.reflect.Method;

@Slf4j
@RequiredArgsConstructor
@Aspect
@Order(1)
@Component
public class TimerAop {

    private final Timer timer;

    @Pointcut("execution(public * com.carming.backend..*Controller.*(..))")
    private void timer() {}

    @Around("timer()")
    public Object executionTimer(ProceedingJoinPoint joinPoint) throws Throwable {

        Long startTime = timer.start();
        Object returnValue = joinPoint.proceed();
        Long elapsedTime = timer.getElapsedTime(startTime);

        Method method = getMethod(joinPoint);
        log.info("[{}] 경과시간: {}ms", method.getName(), elapsedTime);
        return returnValue;
    }

    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }
}
