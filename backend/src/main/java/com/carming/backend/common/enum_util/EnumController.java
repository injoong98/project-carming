package com.carming.backend.common.enum_util;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RequestMapping("/api/enum")
@RestController
public class EnumController {

    private final EnumMapper enumMapper;

    @GetMapping
    public Map<String, List<EnumValue>> getEnumValue() {
        return enumMapper.getAll();
    }
}
