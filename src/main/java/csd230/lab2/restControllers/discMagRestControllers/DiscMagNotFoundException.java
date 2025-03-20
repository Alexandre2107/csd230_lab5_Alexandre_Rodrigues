package csd230.lab2.restControllers.discMagRestControllers;

public class DiscMagNotFoundException extends RuntimeException {
    DiscMagNotFoundException(Long id) {
        super("Could not find discMag " + id);
    }
}