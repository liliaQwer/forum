package com.itechart.forum.post.repository;

import com.itechart.forum.post.dto.PostInfoDto;
import com.itechart.forum.post.entity.Post;
import com.itechart.forum.post.type.CategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer>, QuerydslPredicateExecutor<Post> {

    @Query(value = "SELECT new com.itechart.forum.post.dto.PostInfoDto(p.id,p.title,p.category,p.description,p.createdDate,p.createdBy) FROM Post p ",
    countQuery = "select count(p) from Post p ")
    Page<PostInfoDto> findAllWithoutContent(Pageable pageable);

    @Query(value = "SELECT new com.itechart.forum.post.dto.PostInfoDto(p.id,p.title,p.category,p.description,p.createdDate,p.createdBy) FROM Post p where p.category = ?1",
            countQuery = "select count(p) from Post p where p.category = ?1")
    Page<PostInfoDto> findAllByCategoryWithoutContent(CategoryType category, Pageable pageable);
}
