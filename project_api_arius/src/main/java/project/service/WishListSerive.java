package project.service;

import java.util.List;
import java.util.Optional;

import project.models.WishList;

public interface WishListSerive {

	WishList getById(Integer id);

	void deleteById(Integer id);

	Optional<WishList> findById(Integer id);

	List<WishList> findAll();

	WishList save(WishList wl);

}
