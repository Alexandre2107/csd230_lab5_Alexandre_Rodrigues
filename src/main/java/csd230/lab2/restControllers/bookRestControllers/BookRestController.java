package csd230.lab2.restControllers.bookRestControllers;

import csd230.lab2.entities.Book;
import csd230.lab2.entities.CartItem;
import csd230.lab2.repositories.BookRepository;
import csd230.lab2.repositories.CartItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/book")
public class BookRestController {
    private final BookRepository bookRepository;
    private final CartItemRepository cartItemRepository;

    public BookRestController(BookRepository bookRepository, CartItemRepository cartItemRepository) {
        this.bookRepository = bookRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @GetMapping()
    public List<Book> all() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
    }

    @PostMapping()
    Book newBook(@RequestBody Book newBook) {
        newBook.setDescription("Book: " + newBook.getTitle());
        return bookRepository.save(newBook);
    }

    @PutMapping("/{id}")
    Book replaceBook(@RequestBody Book newBook, @PathVariable Long id) {
        return bookRepository.findById(id).map(
                book -> {
                    // Update book details
                    book.setIsbn(newBook.getIsbn());
                    book.setTitle(newBook.getTitle());
                    book.setAuthor(newBook.getAuthor());
                    book.setPrice(newBook.getPrice());
                    book.setDescription("Book: " + newBook.getTitle()); // Automatically set description

                    // Update associated CartItems
                    List<CartItem> cartItems = cartItemRepository.findByDescription(book.getTitle());
                    for (CartItem cartItem : cartItems) {
                        cartItem.setDescription(newBook.getTitle());
                        cartItem.setPrice(newBook.getPrice());
                        cartItemRepository.save(cartItem);
                    }

                    return bookRepository.save(book);
                }
        ).orElseGet(() -> {
            newBook.setId(id);
            newBook.setDescription("Book: " + newBook.getTitle()); // Automatically set description
            return bookRepository.save(newBook);
        });
    }

    @DeleteMapping("/{id}")
    void deleteBook(@PathVariable Long id) {
        Book book  = bookRepository.findById(id)
                .orElseThrow(() -> new BookNotFoundException(id));
        // Find and delete associated CartItems
        List<CartItem> cartItems = cartItemRepository.findByDescription(book.getDescription());
        cartItemRepository.deleteAll(cartItems);
        bookRepository.delete(book);
    }
}