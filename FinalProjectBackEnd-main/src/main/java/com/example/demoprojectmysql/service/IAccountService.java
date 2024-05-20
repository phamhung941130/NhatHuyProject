package com.example.demoprojectmysql.service;

import com.example.demoprojectmysql.model.dto.AccountCreateDTO;
import com.example.demoprojectmysql.model.dto.AccountUpdateDTO;
import com.example.demoprojectmysql.model.entity.Account;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface IAccountService extends UserDetailsService {
    List<Account> getAll();
    Account create(AccountCreateDTO dto);
    Account update(AccountUpdateDTO dto);
    Account getById(int id);
    Account delete(int id);
}
