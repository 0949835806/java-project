package project.service;

import java.util.List;
import java.util.Optional;

import project.models.Orders;

public interface OrdersService {

	Orders getById(Integer id);

	void delete(Orders o);

	void deleteById(Integer id);

	Optional<Orders> findById(Integer id);

	List<Orders> findAll();

	Orders save(Orders o);
	
	Orders edit(Orders o);

	List<Orders> getOrderByUser(String username);

}
