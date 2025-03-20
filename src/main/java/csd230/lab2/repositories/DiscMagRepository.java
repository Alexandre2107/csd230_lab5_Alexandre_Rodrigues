package csd230.lab2.repositories;

import csd230.lab2.entities.DiscMag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DiscMagRepository extends JpaRepository<DiscMag, Long> {
    DiscMag findById(long id);
    List<DiscMag> findDiscMagByTitle(String title);
    List<DiscMag> findDiscMagByTitleContaining(String titleContains);


    @Query("SELECT d FROM DiscMag d WHERE d.title LIKE %:text%")
    List<DiscMag> findDiscMagByTitleLike(@Param("text") String text);
}