package com.itechart.forum.comment.service;

import com.itechart.forum.comment.dto.CommentAddDto;
import com.itechart.forum.comment.dto.CommentInfoDto;
import com.itechart.forum.comment.dto.CommentUpdateDto;

import javax.transaction.Transactional;

public interface CommentService {
    @Transactional
    int save (CommentAddDto commentAddDto);

    @Transactional
    void update (CommentUpdateDto commentUpdateDto);

    @Transactional
    void delete (Integer id);

    CommentInfoDto getById(Integer id);

}
