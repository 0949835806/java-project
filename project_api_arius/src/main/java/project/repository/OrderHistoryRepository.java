package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.OrderHistory;

@Repository
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Integer>{

	@Query("SELECT o FROM OrderHistory o WHERE o.orderId.orderid = ?1")
	List<OrderHistory> getOrderHistoryByOrderId(int orderid);
}
