package csd230.lab2.repositories;

import csd230.lab2.entities.Magazine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MagazineRepository extends JpaRepository<Magazine, Long> {
    Magazine findById(long id);
    List<Magazine> findByTitle(String title);
    List<Magazine> findByTitleLike(String titlePattern);

    @Query("SELECT m FROM Magazine m WHERE m.orderQty > :orderQty")
    List<Magazine> findMagazinesWithOrderQtyGreaterThan(@Param("orderQty") int orderQty);
}