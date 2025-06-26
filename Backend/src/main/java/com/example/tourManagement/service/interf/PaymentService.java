package com.example.tourManagement.service.interf;

import com.example.tourManagement.dto.RequestDTO;
import com.example.tourManagement.dto.ResponseDTO;

public interface PaymentService {
    ResponseDTO processPayment(RequestDTO requestDTO);

}
