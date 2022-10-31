package project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import project.models.Category;

public interface CategoryService {

	Category getById(Integer cateId);

	void delete(Category cate);

	void deleteById(Integer cateId);

	Optional<Category> findById(Integer cateId);

	Page<Category> findAll(Pageable pageable);

	Page<Category> getAllDanhMucForPageable(int page, int size);

	Category save(Category cate);

	List<Category> findByCateName(String cateName);

	List<Category> findAll();


}
