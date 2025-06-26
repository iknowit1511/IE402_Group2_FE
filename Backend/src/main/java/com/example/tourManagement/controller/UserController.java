package com.example.tourManagement.controller;


import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.dto.UserDTO;
import com.example.tourManagement.service.interf.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<ResponseDTO> getUserById(@PathVariable("userId") Integer userId) {
        ResponseDTO responseDTO = userService.getUserById(userId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> getAllUser() {
        ResponseDTO responseDTO = userService.getAllUsers();
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<ResponseDTO> updateUser(@PathVariable Integer userId, @RequestBody UserDTO updateUserDTO) {
        ResponseDTO response = userService.updateUser(userId, updateUserDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("delete/{userId}")
    public ResponseEntity<ResponseDTO> deleteUser(@PathVariable("userId") Integer userId) {
        ResponseDTO responseDTO = userService.deleteUser(userId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }
}
