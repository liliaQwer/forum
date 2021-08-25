package com.itechart.forum.post.repository;

import com.itechart.forum.post.entity.Post;
import com.itechart.forum.post.type.CategoryType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer>, QuerydslPredicateExecutor<Post> {

    Page<Post> findByCategory(CategoryType category, Pageable pageable);
    Page<Post> findByCategoryAndDescriptionContainingIgnoreCaseOrTitleContainingIgnoreCase(CategoryType category, String description, String title, Pageable pageable);
    Page<Post> findByDescriptionContainingIgnoreCaseOrTitleContainingIgnoreCase(String description, String title, Pageable pageable);

    @EntityGraph(value = "post-with-content")
    Page<Post> findAll(Pageable pageable);
}
