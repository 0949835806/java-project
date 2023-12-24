package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.StatusOrder;

@Repository
public interface StatusOrderRepository extends JpaRepository<StatusOrder, Integer>{
	 StatusOrder findStatusOrderByStatusid(Integer status);
	 
	@Query("SELECT so FROM StatusOrder so WHERE so.statusid >= ?1")
	List<StatusOrder> findByStatusIdGreaterThanEqual(int statusid);
}
