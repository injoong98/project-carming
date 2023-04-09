package com.carming.backend.order.domain.request;

import com.carming.backend.order.domain.OrderConst;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class RedisDTO {
    String key;
    String value;
}
