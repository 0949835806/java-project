package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import project.models.Category;
import project.repository.CategoryRepository;
import project.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{
		
	@Autowired
	private CategoryRepository categoryService;

	@Override
	public Category save(Category cate) {
		return categoryService.save(cate);
	}


	@Override
	public Page<Category> findAll(Pageable pageable) {
		return categoryService.findAll(pageable);
	}

	@Override
	public Optional<Category> findById(Integer cateId) {
		return categoryService.findById(cateId);
	}

	@Override
	public void deleteById(Integer cateId) {
		categoryService.deleteById(cateId);
	}

	@Override
	public void delete(Category cate) {
		categoryService.delete(cate);
	}

	@Override
	public Category getById(Integer cateId) {
		return categoryService.getById(cateId);
	}


	@Override
	public Page<Category> getAllDanhMucForPageable(int page, int size) {
		return categoryService.findAll(PageRequest.of(page, size));
	}


	
	@Override
	public List<Category> findAll() {
		return categoryService.findAll();
	}


	@Override
	public List<Category> findByCateName(String cateName) {
		return categoryService.findByCateName(cateName);
	}


	@Override
	public boolean exists(Example<Category> example) {
		return categoryService.exists(example);
	}


	@Override
	public boolean existsById(Integer id) {
		return categoryService.existsById(id);
	}


	@Override
	public Category getCategoryByCateName(String cateName) {
		return categoryService.getCategoryByCateName(cateName);
	}

}
