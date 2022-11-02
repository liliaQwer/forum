package com.itechart.forum.security;

import com.itechart.forum.security.jwt.JwtAuthenticationEntryPoint;
import com.itechart.forum.security.filter.JwtRequestFilter;
import com.itechart.forum.security.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import com.itechart.forum.security.oauth2.OAuth2AuthenticationFailureHandler;
import com.itechart.forum.security.oauth2.OAuth2AuthenticationSuccessHandler;
import com.itechart.forum.security.userdetails.CustomOAuth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${spring.websecurity.debug:true}")
    boolean webSecurityDebug;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @Autowired
    private UserDetailsService userDetailsServiceImpl;

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

    @Autowired
    private OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler;

    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf().disable();
        httpSecurity.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        httpSecurity
                .authorizeRequests()
                .antMatchers("/oauth2/**").permitAll()
                .antMatchers("/user/signup", "/user/signin","/restore*", "/reset_password").permitAll()
//                .antMatchers( HttpMethod.POST, "/posts").hasAnyRole("ADMIN", "USER")
//                .antMatchers( HttpMethod.PUT, "/posts/*").hasAnyRole("ADMIN", "USER")
//                .antMatchers( HttpMethod.DELETE, "/posts").hasAnyRole("ADMIN", "USER")
                .antMatchers( HttpMethod.GET, "/posts/*", "/posts","/post_categories", "/posts/*/comments").permitAll()
                .antMatchers( HttpMethod.POST, "/posts/*/comments/*/dislike", "/posts/*/comments/*/like").permitAll()
                .antMatchers( HttpMethod.GET, "/comments/like", "/comments/dislike").permitAll()

                .antMatchers( HttpMethod.GET, "/").permitAll()
                .antMatchers( HttpMethod.GET, "/*").permitAll()
                .antMatchers( HttpMethod.GET, "/gs-guide-websocket/*","/gs-guide-websocket/*/*","/gs-guide-websocket/*/*/*").permitAll()
                .antMatchers( HttpMethod.GET, "/api/hello").permitAll()

                .antMatchers("/user").permitAll()

                .antMatchers("/auth/**", "/oauth2/**").permitAll()

                .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                        .authorizationEndpoint()
                .baseUri("/oauth2/authorize")
                .authorizationRequestRepository(cookieAuthorizationRequestRepository())
                .and()
                .redirectionEndpoint()
                .baseUri("/oauth2/callback/*")
                .and()
                .userInfoEndpoint()
                .userService(customOAuth2UserService)
                .and()
                .successHandler(oAuth2AuthenticationSuccessHandler)
                .failureHandler(oAuth2AuthenticationFailureHandler)
              .and()
               .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint);

        // Add a filter to validate the tokens with every request
        httpSecurity.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) {
        web.debug(webSecurityDebug);
        web.ignoring().antMatchers("/*.css","/static/media/*","/static/css/*","/static/js/*", "/js/**",  "/*.js", "/*.*.css","/*.ico", "/*/*/*/*.*.*");
    }

    @Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }
}
