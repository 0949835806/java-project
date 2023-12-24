package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.StatusOrder;
import project.repository.StatusOrderRepository;
import project.service.StatusOrderService;

@Service
public class StatusOrderServiceImpl implements StatusOrderService {

	@Autowired
	private StatusOrderRepository statusRepository;

	@Override
	public StatusOrder save(StatusOrder so) {
		return statusRepository.save(so);
	}

	@Override
	public List<StatusOrder> findAll() {
		return statusRepository.findAll();
	}

	@Override
	public Optional<StatusOrder> findById(Integer id) {
		return statusRepository.findById(id);
	}

	@Override
	public StatusOrder getById(Integer id) {
		return statusRepository.getById(id);
	}

	@Override
	public List<StatusOrder> findByStatusIdGreaterThanEqual(int statusid) {
		return statusRepository.findByStatusIdGreaterThanEqual(statusid);
	}

}
