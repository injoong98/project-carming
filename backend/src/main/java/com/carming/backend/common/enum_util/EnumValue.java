package com.carming.backend.common.enum_util;

import lombok.Data;

@Data
public class EnumValue {

    private String key;

    private String value;

    public EnumValue(EnumModel enumModel) {
        key = enumModel.getKey();
        value = enumModel.getValue();
    }
}
