package csd230.lab2.restControllers.bookRestControllers;

import csd230.lab2.entities.Book;
import csd230.lab2.repositories.BookRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/book")
public class BookRestController {
    private final BookRepository bookRepository;

    public BookRestController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping()
    List<Book> all() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    @PostMapping()
    Book newBook(@RequestBody Book newBook) {
        return bookRepository.save(newBook);
    }

    @PutMapping("/{id}")
    Book replaceBook(@RequestBody Book newBook, @PathVariable Long id) {
        return bookRepository.findById(id).map(
                book -> {
                    book.setIsbn(newBook.getIsbn());
                    book.setTitle(newBook.getTitle());
                    book.setAuthor(newBook.getAuthor());
                    book.setPrice(newBook.getPrice());
                    return bookRepository.save(book);
                }
        ).orElseGet(() -> {
            newBook.setId(id);
            return bookRepository.save(newBook);
        }
        );
    }

    @DeleteMapping("/{id}")
    void deleteBook(@PathVariable Long id) {
        bookRepository.deleteById(id);
    }
}