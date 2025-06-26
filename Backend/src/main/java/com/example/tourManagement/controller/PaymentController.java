package com.example.tourManagement.controller;


import com.example.tourManagement.dto.RequestDTO;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.repository.BookingRepository;
import com.example.tourManagement.repository.PaymentRepository;
import com.example.tourManagement.service.interf.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pay")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/confirm")
    public ResponseEntity<ResponseDTO> confirmPayment(@RequestBody RequestDTO requestDTO) {
        ResponseDTO response = paymentService.processPayment(requestDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

}
