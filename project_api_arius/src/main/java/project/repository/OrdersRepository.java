package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.Orders;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer>{

}
