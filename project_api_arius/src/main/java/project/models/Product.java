package project.models;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product")
public class Product {
	@Id
	@Column(name = "pro_id")
	private String proId;
	
	@Column(name = "pro_name")
	private String proName;
	
	@Column(name = "price")
	private float price;
	
	@Column(name = "sale_price")
	private float sale_price;
	
	@Column(name = "description")
	private String description;
	
	@Column(name = "image")
	private String image;
	
	@Column(name = "status")
	private boolean status;

	@ManyToOne
	@JoinColumn(name = "cate_id", referencedColumnName = "cate_id")
	private Category cateId;
	
	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private List<Comment> comment;
	
	@OneToMany(mappedBy = "products")
	@JsonIgnore
	private List<WishList> wishlist;

	public String getProId() {
		return proId;
	}

	public void setProId(String proId) {
		this.proId = proId;
	}

	public String getProName() {
		return proName;
	}

	public void setProName(String proName) {
		this.proName = proName;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public float getSale_price() {
		return sale_price;
	}

	public void setSale_price(float sale_price) {
		this.sale_price = sale_price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Category getCateId() {
		return cateId;
	}

	public void setCateId(Category cateId) {
		this.cateId = cateId;
	}



	public List<Comment> getComment() {
		return comment;
	}

	public void setComment(List<Comment> comment) {
		this.comment = comment;
	}

	
	public List<WishList> getWishlist() {
		return wishlist;
	}

	public void setWishlist(List<WishList> wishlist) {
		this.wishlist = wishlist;
	}

	public Product() {
		// TODO Auto-generated constructor stub
	}

	public Product(String proId, String proName, float price, float sale_price, String description, String image,
			boolean status, Category cateId, List<Comment> comment, List<WishList> wishlist) {
		super();
		this.proId = proId;
		this.proName = proName;
		this.price = price;
		this.sale_price = sale_price;
		this.description = description;
		this.image = image;
		this.status = status;
		this.cateId = cateId;
		this.comment = comment;
		this.wishlist = wishlist;
	}

	
}
