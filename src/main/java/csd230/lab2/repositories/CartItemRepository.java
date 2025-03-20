package csd230.lab2.repositories;

import csd230.lab2.entities.CartItem;
import csd230.lab2.pojos.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCartId(Long cartId);
    List<CartItem> findByPrice(Double price);
    List<CartItem> findByDescription(String description);
    void removeById(Long id);

//    List<CartItem> findByPriceAndDescriptioAndDescription(double price, String description);

    CartItem findByCart(Cart cart);

    @Query("SELECT c FROM CartItem c WHERE c.price = :price AND c.quantity = :quantity")
    List<CartItem> findByPriceAndQuantity(@Param("price") Double price, @Param("quantity") Integer quantity);
}