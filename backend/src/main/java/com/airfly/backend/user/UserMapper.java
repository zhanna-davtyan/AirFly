package com.airfly.backend.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(User user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "role", ignore = true)
    User signUpToUser(SignUpDto userDto);
}
