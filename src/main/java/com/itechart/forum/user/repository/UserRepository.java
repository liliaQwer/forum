package com.itechart.forum.user.repository;

import com.itechart.forum.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, QuerydslPredicateExecutor<User> {
    User findByLogin(String login);
    User findByEmailIgnoreCase(String email);

    @Modifying
    @Query("update User set password = :password where id = :id")
    void updatePassword(@Param("password") String password, @Param("id") Integer id);
}
