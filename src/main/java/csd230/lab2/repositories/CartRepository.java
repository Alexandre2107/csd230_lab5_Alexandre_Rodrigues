package csd230.lab2.repositories;

import csd230.lab2.entities.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findById(long id);
    List<Cart> findAll();

    @Query("SELECT c FROM Cart c WHERE c.id = :id")
    List<Cart> findByName(@Param("id") int id);

}