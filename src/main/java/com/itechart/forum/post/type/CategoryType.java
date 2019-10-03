package com.itechart.forum.post.type;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.Arrays;

public enum CategoryType {

    All(0),
    SCIENCE(1),
    EDUCATION(2),
    SPORT(3),
    FOOD(4);

    private Integer value;

    private CategoryType (Integer value) {
        this.value = value;
    }

    public static CategoryType fromValue(Integer value) {
        for (CategoryType category : values()) {
            if (category.value == value) {
                return category;
            }
        }
        return CategoryType.All;
    }

    public Integer getValue(){
        return value;
    }
}
