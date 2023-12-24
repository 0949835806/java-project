package project.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.Orders;
import project.models.StatusOrder;
import project.repository.OrdersRepository;
import project.service.OrdersService;

@Service
public class OrdersServiceImpl implements OrdersService {

	@Autowired
	private OrdersRepository ordersRepository;

	@Override
	public Orders save(Orders o) {
		o.setStatus(new StatusOrder(1, "Đang xử lí"));
		return ordersRepository.save(o);
	}

	@Override
	public List<Orders> findAll() {
		return ordersRepository.findAll();
	}

	@Override
	public Optional<Orders> findById(Integer id) {
		return ordersRepository.findById(id);
	}

	@Override
	public void deleteById(Integer id) {
		ordersRepository.deleteById(id);
	}

	@Override
	public void delete(Orders o) {
		ordersRepository.delete(o);
	}

	@Override
	public Orders getById(Integer id) {
		return ordersRepository.getById(id);
	}

	@Override
	public Orders edit(Orders o) {
		return ordersRepository.save(o);
	}

	@Override
	public List<Orders> getOrderByUser(String username) {
		return ordersRepository.getOrderByUser(username);
	}

}
