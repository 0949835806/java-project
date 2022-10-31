package project.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "status_order")
public class StatusOrder {
	@Id
	@Column(name = "status_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int statusid;
	
	@Column(name = "name")
	private String statusname;
	
	@OneToMany(mappedBy = "status")
	@JsonIgnore
	private List<Orders> listOrders;

	public int getStatusid() {
		return statusid;
	}

	public void setStatusid(int statusid) {
		this.statusid = statusid;
	}

	public String getStatusname() {
		return statusname;
	}

	public void setStatusname(String statusname) {
		this.statusname = statusname;
	}

	public List<Orders> getListOrders() {
		return listOrders;
	}

	public void setListOrders(List<Orders> listOrders) {
		this.listOrders = listOrders;
	}

	public StatusOrder() {
		// TODO Auto-generated constructor stub
	}

	public StatusOrder(int statusid, String statusname) {
		super();
		this.statusid = statusid;
		this.statusname = statusname;
	}
	
}
