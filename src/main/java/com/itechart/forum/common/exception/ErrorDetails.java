package com.itechart.forum.common.exception;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
public class ErrorDetails {
    @JsonIgnore
    private Date timestamp;
    private String error;
    private List<String> details;

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("Error: ")
                .append(error)
                .append(" Details: ")
                .append(details);
        return sb.toString();
    }

}
