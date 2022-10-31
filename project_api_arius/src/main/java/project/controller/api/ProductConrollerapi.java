package project.controller.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import project.models.Category;
import project.models.Product;
import project.service.CategoryService;
import project.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductConrollerapi {
	
	private final String URL_UPLOAD = "http://localhost:8080/uploads/";

	@Autowired
	private ProductService productService;
	
	@Autowired
	private CategoryService categoryService;
	
	
	@GetMapping("/")
	public List<Product> getListProductForAdmin(){
		return productService.findAll();
	}
	
	@GetMapping("/getProById/{proId}")
	public ResponseEntity<Object> getProById(@PathVariable("proId")String proId){
		Product product = productService.findById(proId).get();
		return ResponseEntity.ok(product);
	}
	
	@GetMapping("/getProByCateId/{cateId}")
	public ResponseEntity<List<Product>> getProByCateId(@PathVariable("cateId")Integer cateId){
		List<Product> listProduct = productService.getProByCateId(cateId);
		return ResponseEntity.ok(listProduct);
	}
	
	@GetMapping("/getProNewArrivals")
	public ResponseEntity<List<Product>> getProNewArrivals(){
		List<Product> listProNew = productService.findAllByOrderByProIdDesc();
		return ResponseEntity.ok(listProNew);
	}
	
	@GetMapping("/getProBestSale")
	public ResponseEntity<List<Product>> getProBestSale(){
		return ResponseEntity.ok(productService.findBySalePrice());
	}
	
	@PostMapping("/createProduct/{catId}")
	public ResponseEntity<String> createProduct(@RequestBody @Valid Product product,BindingResult result, @PathVariable("catId") int catId) {
//		System.out.println(product.toString());
		Category cat = categoryService.findById(catId).get();
//		System.out.println(cat);
		product.setCateId(cat);
		if(result.hasErrors()) {
			return ResponseEntity.status(400).body("Insert failed!");
		} else {
			productService.save(product);
			return ResponseEntity.ok("Product is valid");
		}
	}
	
	@PutMapping("/editProduct/{catId}")
	public ResponseEntity<String> editProduct(@Valid @RequestBody Product pro,@PathVariable("catId") int catId, BindingResult result){
		Category cat = categoryService.findById(catId).get();
		System.out.println(cat);
		pro.setCateId(cat);
		if(result.hasErrors()) {
			return ResponseEntity.status(400).body("Update failed!");
		} else {;
			productService.save(pro);
			return ResponseEntity.ok("Product is valid");
		}
	
	}	
	@DeleteMapping("/deleteProduct/{proId}")
	public void deleteProduct(@PathVariable("proId")String proId) {
		productService.deleteById(proId);
	}
}
