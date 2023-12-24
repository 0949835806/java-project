package project.controller.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.models.Category;
import project.service.CategoryService;

@RestController
@RequestMapping("/api/category")
@CrossOrigin("http://10.0.2.2:8081")
//@CrossOrigin("http://localhost:4200")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@GetMapping("")
	public List<Category> getListCategory() {
		return categoryService.findAll();
	}

	@GetMapping("/getCateById/{cateId}")
	public ResponseEntity<Object> getCateById(@PathVariable("cateId") Integer cateId) {
		Category cateById = categoryService.findById(cateId).get();
		return ResponseEntity.ok(cateById);
	}

	@PostMapping("/createCategory")
	public ResponseEntity<?> createCategory(@RequestBody @Valid Category category, BindingResult result) {
		Category cate = categoryService.getCategoryByCateName(category.getCateName());
		if (cate != null && categoryService.existsById(cate.getCateId())) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
		} else {
			categoryService.save(category);
			return ResponseEntity.status(200).body("Insert Category is successfully!");
		}
	}

	@PutMapping("/editCategory/{cateId}")
	public ResponseEntity<String> editCategory(@RequestBody @Valid Category category,
			@PathVariable("cateId") Integer cateId, BindingResult result) {
		Category cate = categoryService.getById(cateId);
		cate.setCateName(category.getCateName());
		cate.setStatus(category.isStatus());
		cate.setImage(category.getImage());
		if (result.hasErrors()) {
			return ResponseEntity.status(400).body("Update failed!");
		} else {
			categoryService.save(cate);
			return ResponseEntity.ok("Category is valid");
		}
	}

	@DeleteMapping("/delete/{cateId}")
	public void deleteCategory(@PathVariable("cateId") Integer cateId) {
		categoryService.deleteById(cateId);
	}

	@GetMapping("/searchByName/{cateName}")
	public ResponseEntity<Object> searchByName(@PathVariable("cateName") String cateName) {
		List<Category> listCategory = categoryService.findByCateName(cateName);
		return ResponseEntity.ok(listCategory);
	}
}
