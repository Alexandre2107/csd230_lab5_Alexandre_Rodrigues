package csd230.lab2.restControllers.ticketRestController;

public class TicketNotFoundException extends RuntimeException {
    TicketNotFoundException(Long id) {
        super("Could not find ticket " + id);
    }
}