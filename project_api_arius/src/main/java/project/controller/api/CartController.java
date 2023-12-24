package project.controller.api;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import project.models.Cart;
import project.models.Category;
import project.models.Product;
import project.service.CartService;
import project.service.ProductService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("http://10.0.2.2:8081")
public class CartController {

	@Autowired 
	private CartService cartService;
	
	@Autowired
	private ProductService proService;
	
	@GetMapping("/")
	public ResponseEntity<List<Cart>> getAllCart(){
		return new ResponseEntity<List<Cart>>(cartService.findAll(), HttpStatus.OK);
	}
	
	@PostMapping("/addToCart/{proId}")
	public ResponseEntity<?> addToCart(@RequestBody Cart cart,@PathVariable("proId") String proId,BindingResult result){
		Product pro = proService.getById(proId);
		cart.setProductCart(pro);
		if(result.hasErrors()) {
			return ResponseEntity.status(400).body("Insert failed!");
		} else {
			cartService.save(cart);
			return ResponseEntity.ok("Cart is valid");
		}
	}
	
	@PostMapping("/updateToSubtotal/{proId}")
	public ResponseEntity<?> updateToSubtotal(@RequestBody Cart cart,@PathVariable("proId") String proId,BindingResult result){
		Product pro = proService.getById(proId);
		cart.setProductCart(pro);
		if(result.hasErrors()) {
			return ResponseEntity.status(400).body("Insert failed!");
		} else {
			List<Cart> carts = cartService.findAll();
			updateCartAmount(carts, pro);
			return ResponseEntity.ok("Update cart is valid");
		}
	}

	@DeleteMapping("/deleteCartById/{cartId}")
	public void deleteCartById(@PathVariable("cartId") Integer cartId) {
		cartService.deleteById(cartId);
	}
	
	@DeleteMapping("/clearCart")
	public void clearCart() {
		cartService.deleteAll();
	}
	
	
	 @SuppressWarnings("unused")
	private void updateCartAmount(List<Cart> shoppingCartList, Product pro) {

	        float totalCartAmount = 0f;
	        float singleCartAmount = 0f;

	        for (Cart cart : shoppingCartList) {

	            String productId = cart.getProductCart().getProId();
	            Optional<Product> product = proService.findById(productId);
	            
	            if (product.isPresent()) {
	                Product product1 = product.get();
	                if (product1.getProId().equals(pro.getProId())) {
	                    singleCartAmount = cart.getTotal() + 1;
	                    cart.setTotal(singleCartAmount);
	                }
	                cart.setProductCart(pro);;
	                cartService.save(cart);
	            }
	        }
	    }
}
