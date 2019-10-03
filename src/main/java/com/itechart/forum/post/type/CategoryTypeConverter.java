package com.itechart.forum.post.type;

import java.beans.PropertyEditorSupport;

public class CategoryTypeConverter extends PropertyEditorSupport {

    public void setAsText(final String text){
        Integer value;
        try{
            value = Integer.valueOf(text);
        } catch (NumberFormatException e){
            setValue(CategoryType.All);
            return;
        }
        setValue(CategoryType.fromValue(value));
    }
}
