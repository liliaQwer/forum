package com.itechart.forum.common;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.Optional;

public class AuditorAwareImpl implements AuditorAware<String> {

    public Optional<String> getCurrentAuditor() {
        return Optional.of((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }
}
