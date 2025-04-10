package csd230.lab2.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;

@Entity
public class Ticket extends CartItem {
    @Column(name = "text")
    private String text;

    @JsonIgnore
    @ManyToOne
    private Cart cart;

    public Ticket() {
    }

    public Ticket(double price, int quantity, String description, String text) {
        super(price, quantity, description);
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }
}