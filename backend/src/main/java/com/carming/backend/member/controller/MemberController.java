package com.carming.backend.member.controller;

import com.carming.backend.member.dto.request.MemberCreateDto;
import com.carming.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/api/member")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signupMember(@RequestBody MemberCreateDto request) {
//        memberService.validAuthenticated(request);
        memberService.saveMember(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
