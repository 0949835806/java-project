package project.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.models.OrderHistory;
import project.models.StatusOrder;
import project.service.OrderHistoryService;
import project.service.StatusOrderService;

@RestController
@RequestMapping("/api/orderHistory")
public class OrderHistoryController {

	@Autowired
	private OrderHistoryService service;
	
	@Autowired
	private StatusOrderService statusService;
	
	@PostMapping("/addHistory/{statusid}")
	public ResponseEntity<?> addHistory(@RequestBody OrderHistory history, @PathVariable("statusid")int statusid){
		
		try {
			StatusOrder so = statusService.findById(statusid).get();
			history.setStatusHisoty(so);
			OrderHistory oh = service.save(history);
			return new ResponseEntity<Object>(oh, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/{orderid}")
	public ResponseEntity<List<OrderHistory>> getOrderHistoryByOrderId(@PathVariable("orderid")int orderid){
		return ResponseEntity.ok(service.getOrderHistoryByOrderId(orderid));
	}
}
