package project.controller.api;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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
	public ResponseEntity<?> createProduct(@RequestBody @Valid Product product,BindingResult result, @PathVariable("catId") int catId) {
//		System.out.println(product.toString());
		Category cat = categoryService.findById(catId).get();
//		System.out.println(cat);
		product.setCateId(cat);
		if(result.hasErrors()) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
		} else {
			productService.save(product);
			return new ResponseEntity<Object>(product, HttpStatus.OK);
		}
	}
	
	@PutMapping("/editProduct/{catId}")
	public ResponseEntity<?> editProduct(@Valid @RequestBody Product pro,@PathVariable("catId") int catId, BindingResult result){
		Category cat = categoryService.findById(catId).get();
		System.out.println(cat);
		pro.setCateId(cat);
		if(result.hasErrors()) {
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
		} else {;
			productService.save(pro);
			return new ResponseEntity<Object>(pro, HttpStatus.OK);
		}
	
	}	
	@DeleteMapping("/deleteProduct/{proId}")
	public void deleteProduct(@PathVariable("proId")String proId) {
		productService.deleteById(proId);
	}
	
	@GetMapping("/searchProduct/{proName}")
	public ResponseEntity<List<Product>> searchProduct(@PathVariable("proName") String proName){
		return new ResponseEntity<List<Product>>(productService.findProName(proName), HttpStatus.OK);
	}
}
