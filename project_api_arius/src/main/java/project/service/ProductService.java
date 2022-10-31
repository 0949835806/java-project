package project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import project.models.Product;

public interface ProductService {


	void deleteAll();

	Page<Product> findAll(Pageable pageable);

	List<Product> findAll();

	Product save(Product pro);

	Page<Product> getAllProductForPageable(int page, int size);

	Product getById(String id);

	void deleteById(String id);

	Optional<Product> findById(String id);

	List<Product> findProName(String proName);

	List<Product> getProByCateId(Integer cateId);

	List<Product> findBySalePrice();

	List<Product> findAllByOrderByProIdDesc();

}
