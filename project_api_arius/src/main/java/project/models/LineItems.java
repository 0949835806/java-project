package project.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "line_items")
public class LineItems {

	@Id
	@Column(name = "idlineItem")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idlineItem;
	
	@OneToOne
	@JoinColumn(name = "proId")
	private Product product;
	
	@Column(name = "price")
	private float price;
	
	@Column(name = "quantity")
	private int quantity;
	
	@ManyToOne
	@JoinColumn(name = "order_id", referencedColumnName = "order_id")
	private Orders order;

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

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Orders getOrder() {
		return order;
	}

	public void setOrder(Orders order) {
		this.order = order;
	}
	
	public LineItems() {
		// TODO Auto-generated constructor stub
	}

	public LineItems(int idlineItem, Product product, float price, int quantity, Orders order) {
		super();
		this.idlineItem = idlineItem;
		this.product = product;
		this.price = price;
		this.quantity = quantity;
		this.order = order;
	}
	
	
}
