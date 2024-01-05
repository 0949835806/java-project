package project.controller.api;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.HttpStatus;
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
import project.models.OrderHistory;
import project.models.Orders;
import project.models.StatusOrder;
import project.models.User;
import project.service.LineItemsService;
import project.service.OrderHistoryService;
import project.service.OrdersService;
import project.service.StatusOrderService;
import project.service.UserService;

@RestController
@RequestMapping("/api/order")
public class OrdersController {

	@Autowired
	private OrdersService ordersService;

	@Autowired
	private StatusOrderService statusService;

	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderHistoryService historyService;
	
	@Autowired
	private LineItemsService lineItemService;

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(sf, true));
	}

	@GetMapping("")
	public ResponseEntity<List<Orders>> getListOrder() {
		return ResponseEntity.ok(ordersService.findAll());
	}

	@GetMapping("/{username}")
	public ResponseEntity<?> getListOrderByUser(@PathVariable("username") String username){
		List<Orders> listOrder = ordersService.getOrderByUser(username);
		return ResponseEntity.ok(listOrder);
	}
	@GetMapping("/getOrderById/{orderid}")
	public ResponseEntity<Object> getOrderById(@PathVariable("orderid") Integer orderid) {
		Orders order = ordersService.findById(orderid).get();
		return ResponseEntity.ok(order);
	}

	@GetMapping("/getStatusOrder")
	public ResponseEntity<List<StatusOrder>> getStatusOrder() {
		return ResponseEntity.ok(statusService.findAll());
	}
	
	@GetMapping("/getStatusOrderById/{statusid}")
	public ResponseEntity<List<StatusOrder>> getStatusOrderById(@PathVariable("statusid")int statusid) {
		return ResponseEntity.ok(statusService.findByStatusIdGreaterThanEqual(statusid));
	}

	@PostMapping("/saveOrder/{username}")
	public ResponseEntity<?> saveOrder(@RequestBody Orders orders, @PathVariable("username") String username) {
		User user = userService.getUser(username);
		orders.setUser(user);
		try {
			Orders o = ordersService.save(orders);
			OrderHistory oh = new OrderHistory();
			oh.setOrderId(o);
			oh.setStatusHisoty(new StatusOrder(1, "Đang xử lí"));
			oh.setUpdateDate(new Date());
			historyService.save(oh);
			return new ResponseEntity<Object>(o, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/editOrder/{statusid}")
	public ResponseEntity<?> editOrder(@RequestBody Orders orders, @PathVariable("statusid") int statusid) {

		try {
			StatusOrder so = statusService.findById(statusid).get();
			orders.setStatus(so);
			ordersService.edit(orders);
			return new ResponseEntity<Object>(orders, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping("/deleteOrder/{orderid}")
	public void deleteOrder(@PathVariable("orderid") Integer orderid) {
		ordersService.deleteById(orderid);
	}

	@GetMapping("/getLineItemsByOrder/{orderid}")
	public ResponseEntity<List<LineItems>> getLineItems(@PathVariable("orderid")Integer orderid){
		List<LineItems> ltByOrder = lineItemService.getLineItemsByOrder(orderid);
		return ResponseEntity.ok(ltByOrder);
	}
	
	@PostMapping("/saveLineItems")
	public ResponseEntity<?> saveLineItems(@RequestBody LineItems lineItems){
		try {
			lineItemService.save(lineItems);
			return ResponseEntity.ok(200);
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(400).body("Insert failed!");
		}
	}
	
	@GetMapping("/getLatestId")
	public ResponseEntity<Integer> getLatestId(){
		Integer orderIdLastest = ordersService.findLatestOrderId();
		if(orderIdLastest != null) {
			return new ResponseEntity<Integer>(orderIdLastest, HttpStatus.OK);
		}else {
			return new ResponseEntity<Integer>(1, HttpStatus.OK);
		}
		
	}
}
