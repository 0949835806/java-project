package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.models.StatusOrder;

@Repository
public interface StatusOrderRepository extends JpaRepository<StatusOrder, Integer>{
	 StatusOrder findStatusOrderByStatusid(Integer status);
}
