package project.service;

import java.util.List;

import project.models.OrderHistory;

public interface OrderHistoryService {

	OrderHistory save(OrderHistory entity);

	List<OrderHistory> getOrderHistoryByOrderId(int orderid);

}
