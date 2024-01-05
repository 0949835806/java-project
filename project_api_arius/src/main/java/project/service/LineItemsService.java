package project.service;

import java.util.List;
import java.util.Optional;

import project.models.LineItems;

public interface LineItemsService {

	Optional<LineItems> findById(Integer id);

	List<LineItems> saveAll(Iterable<LineItems> lt);

	List<LineItems> findAll();

	LineItems save(LineItems lt);

	void deleteById(Integer id);

	List<LineItems> getLineItemsByOrder(int orderid);
}
