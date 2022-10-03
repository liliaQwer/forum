package com.itechart.forum.post.repository;

import com.itechart.forum.post.entity.Post;
import com.itechart.forum.post.entity.PostContent;
import com.itechart.forum.post.type.CategoryType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.jdbc.Sql;

import javax.persistence.EntityManager;
import javax.sql.DataSource;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class PostRepositoryTest {
    @Autowired
    private DataSource dataSource;
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private PostRepository postRepository;

    @Test
    void injectedComponentsAreNotNull(){
        assertThat(dataSource).isNotNull();
        assertThat(jdbcTemplate).isNotNull();
        assertThat(entityManager).isNotNull();
        assertThat(postRepository).isNotNull();
    }

    @Test
    void whenSaveNewPostThenItExistsInDb(){
        Post postToAdd = new Post();
        postToAdd.setCategory(CategoryType.FOOD);
        postToAdd.setDescription("Test Description");
        postToAdd.setTitle("Test Title");
        PostContent content = new PostContent();
        content.setBody("TestBody");
        content.setPost(postToAdd);
        postToAdd.setContent(content);

        Post post = postRepository.save(postToAdd);
        assertThat(post).isNotNull();
        int postId = post.getId();
        assertThat(postRepository.findById(postId).get().getDescription()).isEqualTo("Test Description");
    }

    @Test
    @Sql("post.sql")
    void whenFindByCategoryThenReturnOnePost() {
        Pageable pageable = PageRequest.of(0, 8);
        assertThat(postRepository.findByCategory(CategoryType.EDUCATION, pageable).getTotalElements()).isEqualTo(2);
    }
}
