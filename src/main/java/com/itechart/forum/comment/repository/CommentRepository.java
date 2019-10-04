package com.itechart.forum.comment.repository;

import com.itechart.forum.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>, QuerydslPredicateExecutor {

}
