package project.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "OrderHistory")
public class OrderHistory {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@ManyToOne
	@JoinColumn(name = "status_id", referencedColumnName = "status_id")
	private StatusOrder statusHisoty;

	@ManyToOne
	@JoinColumn(name = "order_id", referencedColumnName = "order_id")
	private Orders orderId;

	@Column(name = "update_date")
	private Date updateDate;

	public OrderHistory() {
		// TODO Auto-generated constructor stub
	}

	public OrderHistory(int id, StatusOrder statusHisoty, Orders orderId, Date updateDate) {
		super();
		this.id = id;
		this.statusHisoty = statusHisoty;
		this.orderId = orderId;
		this.updateDate = updateDate;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public StatusOrder getStatusHisoty() {
		return statusHisoty;
	}

	public void setStatusHisoty(StatusOrder statusHisoty) {
		this.statusHisoty = statusHisoty;
	}

	public Orders getOrderId() {
		return orderId;
	}

	public void setOrderId(Orders orderId) {
		this.orderId = orderId;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

}
