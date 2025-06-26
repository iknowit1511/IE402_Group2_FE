package com.example.tourManagement.controller;

import com.example.tourManagement.dto.RequestDTO;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.entity.User;
import com.example.tourManagement.repository.UserRepository;
import com.example.tourManagement.service.interf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<ResponseDTO> register(@RequestBody User user) {
        ResponseDTO responseDTO = userService.registerUser(user);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<ResponseDTO> login(@RequestBody RequestDTO loginRequest) {
        ResponseDTO responseDTO = userService.loginUser(loginRequest);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }
}
