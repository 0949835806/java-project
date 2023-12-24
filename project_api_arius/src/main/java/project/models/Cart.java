package project.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Cart")
public class Cart {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cartId;
	
	@ManyToOne
	@JoinColumn(name = "pro_id",referencedColumnName = "pro_id")
	private Product productCart;
	
	@Column(name = "total")
	private float total;

	public int getCartId() {
		return cartId;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	public Product getProductCart() {
		return productCart;
	}

	public void setProductCart(Product productCart) {
		this.productCart = productCart;
	}

	public float getTotal() {
		return total;
	}

	public void setTotal(float total) {
		this.total = total;
	}
	

	public Cart() {
		
	}

	public Cart(int cartId, Product productCart, float total) {
		super();
		this.cartId = cartId;
		this.productCart = productCart;
		this.total = total;
	}
	
	
}
