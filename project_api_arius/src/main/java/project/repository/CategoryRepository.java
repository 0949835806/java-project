package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.Category;
@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{

	@Query("SELECT c FROM Category c WHERE c.cateName LIKE %?1%")
	List<Category> findByCateName(String cateName);
	
	@Query("SELECT c FROM Category c WHERE c.cateName = ?1")
	Category getCategoryByCateName(String cateName);
}
