package project.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "orders")
public class Orders {
	@Id
	@Column(name = "order_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int orderid;

	@Column(name = "paymentMethod")
	private String paymentMethod;

	@Column(name = "totalPrice")
	private float totalPrice;

	@ManyToOne
	@JoinColumn(name = "address_id", referencedColumnName = "id")
	private Address address;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "status_id", referencedColumnName = "status_id")
	private StatusOrder status;

	@OneToMany(mappedBy = "order")
	@JsonIgnore
	private List<LineItems> lineItems = new ArrayList<>();

	public Orders() {
		// TODO Auto-generated constructor stub
	}

	public Orders(int orderid, String paymentMethod, float totalPrice, Address address, User user, StatusOrder status,
			List<LineItems> lineItems) {
		super();
		this.orderid = orderid;
		this.paymentMethod = paymentMethod;
		this.totalPrice = totalPrice;
		this.address = address;
		this.user = user;
		this.status = status;
		this.lineItems = lineItems;
	}

	public int getOrderid() {
		return orderid;
	}

	public void setOrderid(int orderid) {
		this.orderid = orderid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public StatusOrder getStatus() {
		return status;
	}

	public void setStatus(StatusOrder status) {
		this.status = status;
	}

	public List<LineItems> getLineItems() {
		return lineItems;
	}

	public void setLineItems(List<LineItems> lineItems) {
		this.lineItems = lineItems;
	}

	public String getPaymentMethod() {
		return paymentMethod;
	}

	public void setPaymentMethod(String paymentMethod) {
		this.paymentMethod = paymentMethod;
	}

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

}
