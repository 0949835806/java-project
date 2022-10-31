package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.LineItems;
import project.repository.LineItemsRepository;
import project.service.LineItemsService;

@Service
public class LineItemsServiceImpl implements LineItemsService{

	@Autowired 
	private LineItemsRepository itemsRepository;

	@Override
	public LineItems save(LineItems lt) {
		return itemsRepository.save(lt);
	}

	@Override
	public List<LineItems> findAll() {
		return itemsRepository.findAll();
	}

	@Override
	public List<LineItems> saveAll(Iterable<LineItems> lt) {
		return itemsRepository.saveAll(lt);
	}

	@Override
	public Optional<LineItems> findById(Integer id) {
		return itemsRepository.findById(id);
	}

	@Override
	public void deleteById(Integer id) {
		itemsRepository.deleteById(id);
	}

	@Override
	public List<LineItems> getLineItemsByOrder(Integer orderid) {
		return itemsRepository.getLineItemsByOrder(orderid);
	}
	
	


	
}
