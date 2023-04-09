package com.carming.backend.order.domain.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class DestinationDto {

    private String lon;

    private String lat;
}
