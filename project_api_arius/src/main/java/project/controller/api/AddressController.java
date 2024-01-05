package project.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import project.models.Address;
import project.models.User;
import project.service.AddressService;
import project.service.UserService;

@RestController
@RequestMapping("/api/address")
public class AddressController {

	@Autowired
	private AddressService addressService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{username}")
	public ResponseEntity<?> getAddressByUser(@PathVariable("username") String username){
		List<Address> addressByUser = addressService.getAddressByUser(username);
		return ResponseEntity.ok(addressByUser);
	}
	
	@PostMapping("/addAddress/{username}")
	public ResponseEntity<?> addAddress(@RequestBody Address add,@PathVariable("username") String username ,BindingResult result){
		User user = userService.getUser(username);
		add.setUserId(user);
		if(result.hasErrors()) {
			return ResponseEntity.status(400).body("Insert failed!");
		}else {
			addressService.save(add);
			return ResponseEntity.ok("Insert address is successfully!");
		}
	}
	
	@PutMapping("/editAddress/{username}")
	public ResponseEntity<?> editAddress(@RequestBody Address add,@PathVariable("username") String username ,BindingResult result){
		User user = userService.getUser(username);
		add.setUserId(user);
		if(result.hasErrors()) {
			return ResponseEntity.status(400).body("Update failed!");
		}else {
			addressService.save(add);
			return ResponseEntity.ok("Update address is successfully!");
		}
	}
	
	@DeleteMapping("/deleteAddress/{addressId}")
	public void deleteAddress(@PathVariable("addressId") Integer addressId){
		addressService.deleteById(addressId);
	}

	@GetMapping("/getAddressById/{addressId}")
	public ResponseEntity<Object> getAddressById(@PathVariable("addressId") int addressId){
		Address address = addressService.findById(addressId).get();
		return ResponseEntity.ok(address);
	}
}
