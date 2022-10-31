package project.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.models.WishList;
import project.service.WishListSerive;

@RestController
@RequestMapping("/api/wishlist")
public class WishListController {

	@Autowired
	private WishListSerive wishlistService;
	
	@GetMapping("/")
	public ResponseEntity<List<WishList>> getWishList(){
		return ResponseEntity.ok(wishlistService.findAll());
	}
	
	@PostMapping("/saveWishList")
	public ResponseEntity<String> saveWishList(@RequestBody WishList wl){
		try {
			wishlistService.save(wl);
			return ResponseEntity.ok("Insert successfull");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(400).body("Insert failed!");
		}
	}
	
	@DeleteMapping("/deleteWishlist/{id}")
	public void deleteWishlist(@PathVariable("id")Integer id) {
		wishlistService.deleteById(id);
	}
	
}
