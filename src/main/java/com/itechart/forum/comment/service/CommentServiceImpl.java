package com.itechart.forum.comment.service;

import com.itechart.forum.comment.Comment;
import com.itechart.forum.comment.dto.CommentAddDto;
import com.itechart.forum.comment.dto.CommentInfoDto;
import com.itechart.forum.comment.dto.CommentUpdateDto;
import com.itechart.forum.comment.repository.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServiceImpl implements CommentService{

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    CommentRepository commentRepository;

    @Override
    public int save(CommentAddDto commentAddDto) {
        Comment comment = modelMapper.map(commentAddDto, Comment.class);
        commentRepository.save(comment);
        return comment.getId();
    }

    @Override
    public void update(CommentUpdateDto commentUpdateDto) {
        Comment post = commentRepository.getOne(commentUpdateDto.getId());
        modelMapper.map(commentUpdateDto, post);
    }

    @Override
    public void delete(Integer id) {
        commentRepository.deleteById(id);
    }

    @Override
    public CommentInfoDto getById(Integer id) {
        Comment comment = commentRepository.getOne(id);
        return modelMapper.map(comment, CommentInfoDto.class);
    }
}
