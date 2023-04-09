package com.carming.backend.order.domain.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class IsArrival {

    boolean isDestination;

    public IsArrival(boolean isDestination) {
        this.isDestination = isDestination;
    }

    public static IsArrival createArrival(String info) {
        if (info.equals("1")) {
            return new IsArrival(true);
        }
        return new IsArrival(false);
    }
}
