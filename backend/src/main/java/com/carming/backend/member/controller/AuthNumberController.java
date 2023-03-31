package com.carming.backend.member.controller;

import com.carming.backend.externalApi.naver.sms.SmsFactory;
import com.carming.backend.externalApi.naver.sms.SmsResponse;
import com.carming.backend.member.dto.request.AuthNumbersDto;
import com.carming.backend.member.dto.request.PhoneNumberDto;
import com.carming.backend.member.service.AuthNumbersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RequestMapping("/api/member/valid-number")
@RestController
public class AuthNumberController {

    private final AuthNumbersService authNumberService;

    private final SmsFactory smsFactory;

    @PostMapping("/request")
    public ResponseEntity<Void> makeAuthNumber(@RequestBody @Valid PhoneNumberDto request) {
        String authNumbers = authNumberService.saveAuthNumbers(request);
        SmsResponse response = smsFactory.send(request.getPhone(), authNumbers);
        return new ResponseEntity<>(HttpStatus.resolve(Integer.parseInt(response.getStatusCode())));
    }

    @PostMapping("/valid")
    public ResponseEntity<Void> validAuthNumber(@RequestBody @Valid AuthNumbersDto request) {
        authNumberService.validAuthNumbers(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
