package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer>{

	@Query("SELECT o FROM Orders o WHERE o.user.username = ?1")
	List<Orders> getOrderByUser(String username);
}
