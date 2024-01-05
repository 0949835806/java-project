package project.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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

	@Column(name = "color")
	private String color;

	@Column(name = "size")
	private String size;

	@Column(name = "offer")
	private String offer;

	@Column(name = "description", columnDefinition = "LONGTEXT")
	private String description;

	@Column(name = "image", columnDefinition = "LONGTEXT")
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

	@OneToMany(mappedBy = "product")
	@JsonIgnore
	private List<LineItems> lineItems;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "pro_id", referencedColumnName = "pro_id")
	private List<ImagesProduct> carouselImages = new ArrayList<>();

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

	public String getOffer() {
		return offer;
	}

	public void setOffer(String offer) {
		this.offer = offer;
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


	public List<LineItems> getLineItems() {
		return lineItems;
	}

	public void setLineItems(List<LineItems> lineItems) {
		this.lineItems = lineItems;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public List<ImagesProduct> getCarouselImages() {
		return carouselImages;
	}

	public void setCarouselImages(List<ImagesProduct> carouselImages) {
		this.carouselImages = carouselImages;
	}

	public Product() {
		// TODO Auto-generated constructor stub
	}

	public Product(String proId, String proName, float price, float sale_price, String color, String size, String offer,
			String description, String image, boolean status, Category cateId, List<Comment> comment,
			List<WishList> wishlist, List<LineItems> lineItems, List<ImagesProduct> carouselImages) {
		super();
		this.proId = proId;
		this.proName = proName;
		this.price = price;
		this.sale_price = sale_price;
		this.color = color;
		this.size = size;
		this.offer = offer;
		this.description = description;
		this.image = image;
		this.status = status;
		this.cateId = cateId;
		this.comment = comment;
		this.wishlist = wishlist;
		this.lineItems = lineItems;
		this.carouselImages = carouselImages;
	}

}
