package com.airfly.backend.category;


import com.airfly.backend.common.service.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    List<Category> getAll() {
        try {
            return categoryRepository.findAll();
        } catch (Exception e) {
            throw new EntityNotFoundException("Could not find flights", e);
        }
    }

    public Category getById(long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Could not find Category"));
    }
}
