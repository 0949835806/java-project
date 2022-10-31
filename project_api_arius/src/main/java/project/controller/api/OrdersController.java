package project.controller.api;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.Order;
import javax.xml.crypto.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.models.LineItems;
import project.models.Orders;
import project.models.StatusOrder;
import project.repository.StatusOrderRepository;
import project.service.LineItemsService;
import project.service.OrdersService;
import project.service.StatusOrderService;

@RestController
@RequestMapping("/api/order")
public class OrdersController {

	@Autowired
	private OrdersService ordersService;
	
	@Autowired
	private StatusOrderService statusService;
	
	@Autowired
	private LineItemsService lineItemService;
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(sf, true));
	}
	
	@GetMapping("")
	public ResponseEntity<List<Orders>> getListOrder(){
		return ResponseEntity.ok(ordersService.findAll());
	}
	
	@GetMapping("/getOrderById/{orderid}")
	public ResponseEntity<Object> getOrderById(@PathVariable("orderid")Integer orderid){
		Orders order = ordersService.findById(orderid).get();
		return ResponseEntity.ok(order);
	}
	
	@GetMapping("/getStatusOrder")
	public ResponseEntity<List<StatusOrder>> getStatusOrder(){
		return ResponseEntity.ok(statusService.findAll());
	}
	
	@GetMapping("/getLineItemsByOrder/{orderid}")
	public ResponseEntity<List<LineItems>> getLineItems(@PathVariable("orderid")Integer orderid){
		List<LineItems> ltByOrder = lineItemService.getLineItemsByOrder(orderid);
		return ResponseEntity.ok(ltByOrder);
	}
	
	@PostMapping("/saveOrder")
	public ResponseEntity saveOrder(@RequestBody Orders orders){
		try {
			Orders o = ordersService.save(orders);
			return ResponseEntity.ok(o);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(400).body("Insert failed!");
		}
	}
	
	@PostMapping("/saveLineItems")
	public ResponseEntity saveLineItems(@RequestBody LineItems lineItems){
		try {
			lineItemService.save(lineItems);
			return ResponseEntity.ok(200);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(400).body("Insert failed!");
		}
	}
	
	
	@PutMapping("/editOrder/{statusid}")
	public ResponseEntity<String> editOrder(@RequestBody Orders orders,@PathVariable("statusid")int statusid){
		
		try {
			StatusOrder so = statusService.findById(statusid).get();
			System.out.println(so.getStatusname());
			orders.setStatus(so);
			ordersService.edit(orders);
			return ResponseEntity.ok("Update successfull");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(400).body("Update failed!");
		}
	}
	
	@DeleteMapping("/deleteOrder/{orderid}")
	public void deleteOrder(@PathVariable("orderid")Integer orderid) {
		ordersService.deleteById(orderid);
	}
	
}
