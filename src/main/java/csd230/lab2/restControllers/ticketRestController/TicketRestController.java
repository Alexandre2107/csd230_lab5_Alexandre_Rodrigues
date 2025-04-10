package csd230.lab2.restControllers.ticketRestController;

import csd230.lab2.entities.CartItem;
import csd230.lab2.entities.Ticket;
import csd230.lab2.repositories.CartItemRepository;
import csd230.lab2.repositories.TicketRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("rest/ticket")
public class TicketRestController {
    private final TicketRepository ticketRepository;
    private final CartItemRepository cartItemRepository;

    public TicketRestController(TicketRepository ticketRepository, CartItemRepository cartItemRepository) {
        this.ticketRepository = ticketRepository;
        this.cartItemRepository = cartItemRepository;
    }

    @GetMapping()
    List<Ticket> all() {
        return ticketRepository.findAll();
    }

    @GetMapping("/{id}")
    public Ticket getTicket(@PathVariable Long id) {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException(id));
    }

    @PostMapping()
    Ticket newTicket(@RequestBody Ticket newTicket) {
        newTicket.setDescription("Ticket: " + newTicket.getText());
        return ticketRepository.save(newTicket);
    }

    @PutMapping("/{id}")
    Ticket replaceTicket(@RequestBody Ticket newTicket, @PathVariable Long id) {
        return ticketRepository.findById(id)
                .map(ticket -> {
                    // Update Ticket details
                    ticket.setPrice(newTicket.getPrice());
                    ticket.setQuantity(newTicket.getQuantity());
                    ticket.setDescription("Ticket: " + newTicket.getText());
                    ticket.setText(newTicket.getText());

                    // Update associated CartItems
                    List<CartItem> cartItems = cartItemRepository.findByDescription(ticket.getText());
                    for (CartItem cartItem : cartItems) {
                        cartItem.setDescription(newTicket.getText());
                        cartItem.setPrice(newTicket.getPrice());
                        cartItemRepository.save(cartItem);
                    }

                    return ticketRepository.save(ticket);
                })
                .orElseGet(() -> {
                    newTicket.setId(id);
                    newTicket.setDescription("Ticket: " + newTicket.getText());
                    return ticketRepository.save(newTicket);
                });
    }

    @DeleteMapping("/{id}")
    void deleteTicket(@PathVariable Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new TicketNotFoundException(id));
        List<CartItem> cartItems = cartItemRepository.findByDescription(ticket.getDescription());
        cartItemRepository.deleteAll(cartItems);
        ticketRepository.deleteById(id);

    }
}