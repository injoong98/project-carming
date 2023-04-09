package com.carming.backend.login.authentication;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

@Slf4j
@Component
//@PropertySource("classpath:jwt-info.properties")
public class JwtProvider {

    //    @Value("${jwt.secret}")
    private static String jwtSecret = "VlwEyVBsYt9V7zq57TejMnVUyzblYcfPQye08f7MGVA9XkHaVlwEyVBsYt9V7zq57TejMnVUyzblYcfPQye08f7MGVA9XkHa";

    //    @Value("${jwt.expiredTime}")
    private static int jwtExpirationTime = 86_400_000;



    public static String generateToken(Authentication authentication) {
        User userPrincipal = (User) authentication.getPrincipal();
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationTime);

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }


    public static boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            e.printStackTrace();
        }
        return false;
    }

    public static String getAuthentication(String token) {
        try {
            return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (ExpiredJwtException e) {
            log.info("token Expired");
            return e.getClaims().getSubject();
        }
    }

    public static String resolveToken(HttpServletRequest request) {
        log.info(">>>>>>>>>>>>>> resolveToken");
        String bearerToken = request.getHeader(JwtConst.HEADER_STRING);
        log.info(">>>>>>>>>>>>>>>> bearerToken = {}", bearerToken);
        if (bearerToken != null && bearerToken.startsWith(JwtConst.TOKEN_TYPE)) {
            log.info(">>>>>>>>>>>>>>>>>>> not null");
            return bearerToken.substring(7);
        }
        return null;
    }
}
