package project.service;

import java.util.List;
import java.util.Optional;

import project.models.StatusOrder;

public interface StatusOrderService {

	StatusOrder getById(Integer id);

	Optional<StatusOrder> findById(Integer id);

	List<StatusOrder> findAll();

	StatusOrder save(StatusOrder so);

}
