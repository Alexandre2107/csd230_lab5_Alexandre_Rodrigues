package csd230.lab2.restControllers.publicationRestControllers;

public class PublicationNotFoundException extends RuntimeException {
    PublicationNotFoundException(Long id) {
        super("Could not find publication " + id);
    }
}