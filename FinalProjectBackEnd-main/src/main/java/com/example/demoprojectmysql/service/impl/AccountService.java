package com.example.demoprojectmysql.service.impl;

import com.example.demoprojectmysql.model.dto.AccountCreateDTO;
import com.example.demoprojectmysql.model.dto.AccountUpdateDTO;
import com.example.demoprojectmysql.model.entity.Account;
import com.example.demoprojectmysql.model.entity.Role;
import com.example.demoprojectmysql.repository.AccountRepository;
import com.example.demoprojectmysql.service.IAccountService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
//@AllArgsConstructor
public class AccountService implements IAccountService {
    @Autowired
    private AccountRepository accountRepository;

    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }


    @Override
    public List<Account> getAll() {
        return accountRepository.findAll();
    }

    @Override
    public Account create(AccountCreateDTO dto) {
        Account account = new Account();
        BeanUtils.copyProperties(dto, account);
        account.setRole(Role.USER);
        return accountRepository.save(account);
    }

    @Override
    public Account update(AccountUpdateDTO dto) {
        Optional<Account> optionalAccount = accountRepository.findById(dto.getId());
        if (optionalAccount.isPresent()) {
            Account account = optionalAccount.get();
            BeanUtils.copyProperties(dto, account);
            return accountRepository.save(account);
        }
        return null;
    }

    @Override
    public Account getById(int id) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        if (optionalAccount.isPresent()) {
            return optionalAccount.get();
        }
        return null;
    }

    @Override
    public Account delete(int id) {
        accountRepository.deleteById(id);
        return null;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Account> accountOptional = accountRepository.findByUsername(username);
        if (accountOptional.isEmpty()){ // Nếu username không tồn tại -> bắn ra lỗi
            throw new UsernameNotFoundException(username);
        }
        Account account = accountOptional.get();
        // Tạo ra đối tượng UserDetails ( là đối tượng mà hàm loadUserByUsername muốn trả về) từ account
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(account.getRole());
        return new User(account.getUsername(), account.getPassword(), authorities);
    }

}
