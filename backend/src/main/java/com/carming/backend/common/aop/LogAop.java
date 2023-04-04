package com.carming.backend.common.aop;

import com.carming.backend.exception.CustomException;
import com.carming.backend.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.stream.Stream;

@Slf4j
@Aspect
@Order(2)
@Component
public class LogAop {

    // public -> 접근 제어자가 public
    // * -> 반환형은 아무거나
    // com.carming.backend..*Controller -> 해당 패키지 및 하위 패키지에서 Controller 로 끝나는 조건
    // .*(..) -> 파라미터가 0개 이상인 모든 메소드
    @Pointcut("execution(public * com.carming.backend..*Controller.*(..))")
    private void logCut() {}

    @Before("logCut()")
    public void beforeLogCut(JoinPoint joinPoint) {
        //메소드 + URI 받아오기
        Method method = getMethod(joinPoint);
        Class<?> clazz = joinPoint.getTarget().getClass();
        log.info("[{}] {}", method.getName(), getRequestUrl(method, clazz));

        //파라미터 받아오기
        Object[] args = joinPoint.getArgs();
        if (args.length == 0) {
            log.info(" - requestType[EMPTY] = No Parameter");
            return;
        }
        for (Object arg : args) {
            log.info(" - requestType[{}] = {}", arg.getClass().getSimpleName(), arg);
        }
    }

    @AfterReturning(value = "logCut()", returning = "response")
    public Object afterReturningLogCut(JoinPoint joinPoint, Object response) {
        log.info(" - returnTYPE[{}] = {}", response.getClass().getSimpleName(), response);
        return response;
    }

    @AfterThrowing(value = "logCut()", throwing = "e")
    public void afterThrowingLogCut(JoinPoint joinPoint, CustomException e) {
        throw e;
    }

    //JoinPoint로 메소드 정보 가져오기
    private Method getMethod(JoinPoint joinPoint) {
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        return signature.getMethod();
    }

    private String getRequestUrl(Method method, Class clazz) {
        RequestMapping requestMapping = (RequestMapping) clazz.getAnnotation(RequestMapping.class);
        String baseUrl = requestMapping.value()[0];

        String url = Stream.of(GetMapping.class, PostMapping.class, PutMapping.class, PatchMapping.class, DeleteMapping.class, RequestMapping.class)
                .filter(mappingClass -> method.isAnnotationPresent(mappingClass))
                .map(mappingClass -> getUrl(method, mappingClass, baseUrl))
                .findFirst().orElse(null);

        return url;
    }

    private String getUrl(Method method, Class<? extends Annotation> annotationClass, String baseUrl) {

        Annotation annotation = method.getAnnotation(annotationClass);
        String[] value;
        String httpMethod = null;

        try {
            value = (String[]) annotationClass.getMethod("value").invoke(annotation);
            httpMethod = (annotationClass.getSimpleName().replace("Mapping", "")).toUpperCase();
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e) {
            return null;
        }

        return String.format("%s %s%s", httpMethod, baseUrl, value.length > 0 ? value[0] : "");
    }
}
