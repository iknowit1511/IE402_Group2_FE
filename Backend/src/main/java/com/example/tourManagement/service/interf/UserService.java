package com.example.tourManagement.service.interf;

import com.example.tourManagement.dto.RequestDTO;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.dto.UserDTO;
import com.example.tourManagement.entity.User;

import java.util.List;


public interface UserService {
    ResponseDTO registerUser(User user);
    ResponseDTO loginUser(RequestDTO requestDTO);
    ResponseDTO getUserById(Integer userId);
    ResponseDTO getAllUsers();
    ResponseDTO updateUser(Integer userId, UserDTO userDTO);
    ResponseDTO deleteUser(Integer userId);

    ResponseDTO getUserBooking(Integer userId);
}