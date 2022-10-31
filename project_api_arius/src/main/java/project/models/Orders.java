package project.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

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
	
	
	@Column(name = "dateOfset")
	private Date dateofset;
	
	@Column(name = "delivery")
	private boolean delivery;
	
	@Column(name = "note")
	private String note;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User user;
	
	
	@ManyToOne
	@JoinColumn(name = "status_id",referencedColumnName = "status_id")
	private StatusOrder status;
	
	@JsonIgnore
	@OneToMany(mappedBy = "order")
	private List<LineItems> lineItems;

	
	public Orders() {
		// TODO Auto-generated constructor stub
	}


	public Orders(int orderid, Date dateofset, boolean delivery, String note, User user, StatusOrder status,
			List<LineItems> lineItems) {
		super();
		this.orderid = orderid;
		this.dateofset = dateofset;
		this.delivery = delivery;
		this.note = note;
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


	public Date getDateofset() {
		return dateofset;
	}


	public void setDateofset(Date dateofset) {
		this.dateofset = dateofset;
	}





	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}



	public String getNote() {
		return note;
	}




	public void setNote(String note) {
		this.note = note;
	}

	
	
	public boolean isDelivery() {
		return delivery;
	}


	public void setDelivery(boolean delivery) {
		this.delivery = delivery;
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


}
