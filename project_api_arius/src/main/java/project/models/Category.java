package project.models;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "category")

public class Category {
	@Id
	@Column(name = "cate_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cateId;

	@Column(name = "cate_name")
	@NotEmpty(message = "tên danh mục không được để trống")
	private String cateName;

	@Column(name = "image", columnDefinition = "LONGTEXT")
	private String image;

	@Column(name = "status")
	private boolean status;

	@JsonIgnore
	@OneToMany(mappedBy = "cateId")
	private List<Product> listProduct;

	public int getCateId() {
		return cateId;
	}

	public void setCateId(int cateId) {
		this.cateId = cateId;
	}

	public String getCateName() {
		return cateName;
	}

	public void setCateName(String cateName) {
		this.cateName = cateName;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public List<Product> getListProduct() {
		return listProduct;
	}

	public void setListProduct(List<Product> listProduct) {
		this.listProduct = listProduct;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}


	public Category() {
		// TODO Auto-generated constructor stub
	}

	public Category(int cateId, @NotEmpty(message = "tên danh mục không được để trống") String cateName, String image,
			boolean status, List<Product> listProduct) {
		super();
		this.cateId = cateId;
		this.cateName = cateName;
		this.image = image;
		this.status = status;
		this.listProduct = listProduct;
	}

}
