package com.carming.backend;

import com.carming.backend.exception.InvalidRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {


    @GetMapping("/test-exception")
    public void testException() {
        throw new InvalidRequest();
    }
}
