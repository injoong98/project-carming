package com.carming.backend.common.config;

import com.carming.backend.common.enum_util.EnumMapper;
import com.carming.backend.member.domain.CardCompany;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class EnumConfig {

    @Bean
    public EnumMapper enumMapper() {
        EnumMapper enumMapper = new EnumMapper();
        enumMapper.put("cardCompany", CardCompany.class);
        return enumMapper;
    }
}
