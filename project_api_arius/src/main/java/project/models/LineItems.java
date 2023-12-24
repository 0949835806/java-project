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

	@Column(name = "description")
	private String description;

	@Column(name = "image", columnDefinition = "LONGTEXT")
	private String image;

	@Column(name = "status")
	private boolean status;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "idlineItem", referencedColumnName = "idlineItem")
	private List<ImagesProduct> carouselImages = new ArrayList<>();

	@ManyToOne
	@JoinColumn(name = "cate_id", referencedColumnName = "cate_id")
	private Category cate;

	@Column(name = "quantity")
	private int quantity;

	public int getIdlineItem() {
		return idlineItem;
	}

	public void setIdlineItem(int idlineItem) {
		this.idlineItem = idlineItem;
	}

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

	public List<ImagesProduct> getCarouselImages() {
		return carouselImages;
	}

	public void setCarouselImages(List<ImagesProduct> carouselImages) {
		this.carouselImages = carouselImages;
	}

	public Category getCate() {
		return cate;
	}

	public void setCate(Category cate) {
		this.cate = cate;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public LineItems() {
		super();
	}

	public LineItems(int idlineItem, String proId, String proName, float price, float sale_price, String color,
			String size, String offer, String description, String image, boolean status,
			List<ImagesProduct> carouselImages, Category cate, int quantity) {
		super();
		this.idlineItem = idlineItem;
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
		this.carouselImages = carouselImages;
		this.cate = cate;
		this.quantity = quantity;
	}

}
