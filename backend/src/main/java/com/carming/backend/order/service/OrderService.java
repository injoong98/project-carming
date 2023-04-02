package com.carming.backend.order.service;

import com.carming.backend.common.JsonMapper;
import com.carming.backend.order.domain.OrderConst;
import com.carming.backend.order.domain.request.DestinationDto;
import com.carming.backend.order.domain.response.IsArrival;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class OrderService {

    private final StringRedisTemplate redisTemplate;

    @Transactional
    public void saveDestination(DestinationDto request) {
        String destination = JsonMapper.toJson(request);
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(OrderConst.DESTINATION, destination);
    }

    public void getOff() {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(OrderConst.GET_OFF, "1");
    }
    public IsArrival isDestination() {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        String result = operations.get(OrderConst.IS_ARRIVAL);
        return IsArrival.createArrival(result);
    }

    public DestinationDto getCurrentPosition() {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        String json = operations.get(OrderConst.CURRENT_POSITION);
        DestinationDto currentPosition = JsonMapper.toClass(json, DestinationDto.class);
        return currentPosition;
    }

    public String[] getGlobalPath() {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        String json = operations.get(OrderConst.PATHS);
        String[] strings = JsonMapper.toClass(json, String[].class);
        return strings;
    }

    public String getValueByKey(String key) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        return operations.get(key);
    }

    public void setValueByKey(String key, String value) {
        ValueOperations<String, String> operations = redisTemplate.opsForValue();
        operations.set(key, value);
    }
}
