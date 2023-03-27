package com.carming.backend.login.authentication;

import com.carming.backend.member.domain.Member;
import com.carming.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@RequiredArgsConstructor
@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByPhone(username)
                .orElseThrow(() -> new UsernameNotFoundException("등록된 핸드폰이 아닙니다."));

        return new User(member.getUsername(), member.getPassword(), new ArrayList<>());
    }
}
