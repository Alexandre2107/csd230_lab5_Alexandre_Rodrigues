package csd230.lab2.repositories;

import csd230.lab2.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
  List<Book> findByIsbn(String isbn);
  List<Book> findByTitle(String title);
  List<Book> findByAuthor(String author);
  Book findById(long id);

  @Query("SELECT b FROM Book b WHERE b.price BETWEEN :minPrice AND :maxPrice")
  List<Book> findBooksInPriceRange(@Param("minPrice") double minPrice, @Param("maxPrice") double maxPrice);
}