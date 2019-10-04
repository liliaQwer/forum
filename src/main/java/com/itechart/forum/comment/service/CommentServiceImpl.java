package com.itechart.forum.comment.service;

import com.itechart.forum.comment.Comment;
import com.itechart.forum.comment.QComment;
import com.itechart.forum.comment.dto.CommentAddDto;
import com.itechart.forum.comment.dto.CommentInfoDto;
import com.itechart.forum.comment.repository.CommentRepository;
import com.itechart.forum.common.exception.ResourceNotFoundException;
import com.querydsl.core.BooleanBuilder;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.naming.NoPermissionException;
import javax.persistence.EntityNotFoundException;

@Service
public class CommentServiceImpl implements CommentService {

    ModelMapper modelMapper;

    CommentRepository commentRepository;

    @Autowired
    public CommentServiceImpl(ModelMapper modelMapper, CommentRepository commentRepository) {
        this.modelMapper = modelMapper;
        this.commentRepository = commentRepository;
        this.modelMapper.addMappings(new PropertyMap<CommentAddDto, Comment>() {
            @Override
            protected void configure() {
                skip(destination.getId());
            }
        });
    }

    @Override
    public int save(CommentAddDto commentAddDto) {
        Comment comment = modelMapper.map(commentAddDto, Comment.class);
        commentRepository.save(comment);
        return comment.getId();
    }

    @Override
    public void delete(UserDetails userDetails, Integer id) throws NoPermissionException, ResourceNotFoundException {
        checkPermission(userDetails, id);
        commentRepository.deleteById(id);
    }

    @Override
    public Page<CommentInfoDto> get(int postId, Pageable pageable) {
        QComment comment = QComment.comment;
        BooleanBuilder predicate = new BooleanBuilder();
        predicate.and(comment.post.id.eq(postId));
        Page<Comment> commentPage = commentRepository.findAll(predicate, pageable);
        Page<CommentInfoDto> commentDtoPage = commentPage.map((commentElement) -> modelMapper.map(commentElement, CommentInfoDto.class));
        return commentDtoPage;
    }

    @Override
    public void addLike(Integer id) throws ResourceNotFoundException {
        Comment comment = getOne(id);
        comment.setLikesCount(comment.getLikesCount() + 1);
    }

    @Override
    public void addDislike(Integer id) throws ResourceNotFoundException {
        Comment comment = getOne(id);
        comment.setDislikesCount(comment.getDislikesCount() + 1);
    }

    private void checkPermission(UserDetails userDetails, int id) throws NoPermissionException, ResourceNotFoundException {
        Comment comment = getOne(id);
        if (!comment.getCreatedBy().equals(userDetails.getUsername()) &&
                !userDetails.getAuthorities().contains("ADMIN")) {
            throw new NoPermissionException("You have no permission for this operation with post with id: " + id);
        }
    }

    private Comment getOne(int id) throws ResourceNotFoundException {
        Comment comment;
        try{
            comment = commentRepository.getOne(id);
            comment.getId();
        }catch (EntityNotFoundException e){
            throw new ResourceNotFoundException("Comment not found with this id: " + id);
        }
        return comment;
    }
}
