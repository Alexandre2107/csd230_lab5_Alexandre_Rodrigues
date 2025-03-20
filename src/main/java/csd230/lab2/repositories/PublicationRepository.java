package csd230.lab2.repositories;

import csd230.lab2.entities.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PublicationRepository extends JpaRepository<Publication, Long> {
    Publication findById(long id);
    List<Publication> findByTitle(String title);
    List<Publication> findByTitleLike(String titlePattern);

    @Query("SELECT p FROM Publication p WHERE p.copies > :copies")
    List<Publication> findByCopiesGreaterThan(int copies);
}