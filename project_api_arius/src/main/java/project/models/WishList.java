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
@Table(name = "wish_list")
public class WishList {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "pro_id",referencedColumnName = "pro_id")
	private Product products;
	
	@ManyToOne
	@JoinColumn(name = "user_id",referencedColumnName = "user_id")
	private User users;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Product getProducts() {
		return products;
	}

	public void setProducts(Product products) {
		this.products = products;
	}

	public User getUsers() {
		return users;
	}

	public void setUsers(User users) {
		this.users = users;
	}
	
	public WishList() {
		// TODO Auto-generated constructor stub
	}

	public WishList(int id, Product products, User users) {
		super();
		this.id = id;
		this.products = products;
		this.users = users;
	}
	
	
}
