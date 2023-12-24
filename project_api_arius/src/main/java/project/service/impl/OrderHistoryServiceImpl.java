package project.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.OrderHistory;
import project.repository.OrderHistoryRepository;
import project.service.OrderHistoryService;

@Service
public class OrderHistoryServiceImpl implements OrderHistoryService {

	@Autowired
	private OrderHistoryRepository repo;

	@Override
	public OrderHistory save(OrderHistory entity) {
		return repo.save(entity);
	}

	@Override
	public List<OrderHistory> getOrderHistoryByOrderId(int orderid) {
		return repo.getOrderHistoryByOrderId(orderid);
	}

}
