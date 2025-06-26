package com.example.tourManagement.service.interf;


public interface NotificationService {
    void sendPaymentConfirmation(String to, String subject, String body);
}
