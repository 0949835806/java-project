package project.models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "line_items")
public class LineItems {

	@Id
	@Column(name = "idlineItem")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idlineItem;

	@ManyToOne
	@JoinColumn(name = "pro_id", referencedColumnName = "pro_id")
	private Product product;

	@ManyToOne
	@JoinColumn(name = "order_id", referencedColumnName = "order_id")
	private Orders order;
	
	@Column(name = "subtotal")
	private int subtotal;

	public int getIdlineItem() {
		return idlineItem;
	}

	public void setIdlineItem(int idlineItem) {
		this.idlineItem = idlineItem;
	}
	

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}


	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}

	public int getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(int subtotal) {
		this.subtotal = subtotal;
	}

	public LineItems() {
		super();
	}

	public LineItems(int idlineItem, Product product, Orders order, int subtotal) {
		super();
		this.idlineItem = idlineItem;
		this.product = product;
		this.order = order;
		this.subtotal = subtotal;
	}
}
