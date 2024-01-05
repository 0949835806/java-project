package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.LineItems;

@Repository
public interface LineItemsRepository extends JpaRepository<LineItems, Integer>{

	@Query("SELECT lt FROM LineItems lt WHERE lt.order.orderid = ?1")
	List<LineItems> getLineItemsByOrder(int orderid);
}
