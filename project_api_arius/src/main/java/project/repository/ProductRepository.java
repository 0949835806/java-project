package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.Product;
@Repository
public interface ProductRepository extends JpaRepository<Product, String>{

	
	@Query("SELECT p FROM Product p WHERE p.proName LIKE %?1%")
	List<Product> findProName(String proName);
	
	@Query("SELECT p FROM Product p WHERE p.cateId.cateId = ?1")
	List<Product> getProByCateId(Integer cateId);
	
	@Query("SELECT p FROM Product p ORDER BY p.proId DESC")
	List<Product> findAllByOrderByProIdDesc();
	
	@Query("SELECT p FROM Product p ORDER BY p.sale_price ASC")
	List<Product> findBySalePrice();
}
