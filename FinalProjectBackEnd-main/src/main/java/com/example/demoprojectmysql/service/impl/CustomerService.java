package com.example.demoprojectmysql.service.impl;

import com.example.demoprojectmysql.model.entity.Customer;
import com.example.demoprojectmysql.repository.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
public class CustomerService {
    private CustomerRepository customerRepository;

    public void saveCustomersToDatabase(MultipartFile file){
        if(ExcelUploadService.isValidExcelFile(file)){
            try {
                List<Customer> customers = ExcelUploadService.getCustomersDataFromExcel(file.getInputStream());
                this.customerRepository.saveAll(customers);
            } catch (IOException e) {
                throw new IllegalArgumentException("The file is not a valid excel file");
            }
        }
    }
}
