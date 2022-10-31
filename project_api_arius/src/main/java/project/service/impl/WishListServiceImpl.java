package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.WishList;
import project.repository.WishListRepository;
import project.service.WishListSerive;

@Service
public class WishListServiceImpl implements WishListSerive{
	@Autowired
	private WishListRepository wishlistRepo;

	@Override
	public WishList save(WishList wl) {
		return wishlistRepo.save(wl);
	}

	@Override
	public List<WishList> findAll() {
		return wishlistRepo.findAll();
	}

	
	@Override
	public Optional<WishList> findById(Integer id) {
		return wishlistRepo.findById(id);
	}

	@Override
	public void deleteById(Integer id) {
		wishlistRepo.deleteById(id);
	}

	@Override
	public WishList getById(Integer id) {
		return wishlistRepo.getById(id);
	}
	
	

}
