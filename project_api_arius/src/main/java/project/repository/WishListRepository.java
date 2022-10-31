package project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.models.WishList;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Integer>{

}
