package com.example.tourManagement.service.impl;

import com.example.tourManagement.dto.RequestDTO;
import com.example.tourManagement.dto.ResponseDTO;
import com.example.tourManagement.dto.UserDTO;
import com.example.tourManagement.entity.User;
import com.example.tourManagement.repository.UserRepository;
import com.example.tourManagement.service.interf.UserService;
import com.example.tourManagement.utils.JWTUtils;
import com.example.tourManagement.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTUtils jwtUtils;

    @Override
    public ResponseDTO registerUser(User user) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            if (user.getUserRole() == null || user.getUserRole().isBlank()) {
                user.setUserRole("USER");
            }

            if (userRepository.existsByUserEmail(user.getUserEmail())) {
                throw new Exception(user.getUserEmail() + " already exists!");
            }

            user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
            User savedUser = userRepository.save(user);
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(savedUser);

            responseDTO.setStatusCode(200);
            responseDTO.setUserDTO(userDTO);

        } catch (IllegalArgumentException e) {
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Internal server error");
        }

        return responseDTO;
    }

    @Override
    public ResponseDTO loginUser(RequestDTO requestDTO) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestDTO.getUserEmail(), requestDTO.getUserPassword()));
            var user = userRepository.findByUserEmail(requestDTO.getUserEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found!"));

            var token = jwtUtils.generateToken(user);
            responseDTO.setStatusCode(200);
            responseDTO.setToken(token);
            responseDTO.setUserRole(user.getUserRole());
            responseDTO.setExpirationTime("1 hour");
            responseDTO.setMessage("Successful!!!");

        } catch (IllegalArgumentException e ){
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Internal server error");
        }

        return responseDTO;
    }

    @Override
    public ResponseDTO getUserById(Integer userId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
            UserDTO userDTO = Utils.mapUserEntityToUserDTO(user);
            responseDTO.setUserDTO(userDTO);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Successful!!!");
        } catch (IllegalArgumentException e ){
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Internal server error");
        }

        return responseDTO;
    }

    @Override
    public ResponseDTO getAllUsers() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            List<User> userList = userRepository.findAll();
            List<UserDTO> userDTOList = userList.stream().map(Utils::mapUserEntityToUserDTO).toList();
            responseDTO.setUserList(userDTOList);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Successful!!!");
        } catch (IllegalArgumentException e ){
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Internal server error");
        }


        return responseDTO;
    }

    @Override
    public ResponseDTO updateUser(Integer userId, UserDTO userDTO) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
            if (userDTO.getUserName() != null) {
                user.setUserName(userDTO.getUserName());
            }

            if (userDTO.getUserEmail() != null) {
                user.setUserEmail(userDTO.getUserEmail());
            }

            if (userDTO.getUserAddress() != null) {
                user.setUserAddress(userDTO.getUserAddress());
            }

            if (userDTO.getUserPhone() != null) {
                user.setUserPhone(userDTO.getUserPhone());
            }

            if (userDTO.getUserPassword() != null) {
                user.setUserPassword(passwordEncoder.encode(userDTO.getUserPassword()));
            }

            if (userDTO.getUserRole() != null) {
                user.setUserRole(userDTO.getUserRole());
            }

            User updatedUser = userRepository.save(user);
            UserDTO responseUser = Utils.mapUserEntityToUserDTO(updatedUser);
            responseDTO.setUserDTO(responseUser);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Successful!!!");
        } catch (IllegalArgumentException e ){
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Internal server error");
        }


        return responseDTO;
    }

    @Override
    public ResponseDTO deleteUser(Integer userId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found!!!"));
            userRepository.deleteById(userId);
            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Successful!!!");
        } catch (IllegalArgumentException e ){
            responseDTO.setStatusCode(400);
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Internal server error");
        }

        return responseDTO;
    }

    @Override
    public ResponseDTO getUserBooking(Integer userId) {
        return null;
    }
}
