package project.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import javax.persistence.Id;

@Entity
@Table(name = "ImagesProduct")
public class ImagesProduct {

	@Id
	@Column(name = "imgId")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int imgId;

	@Column(name = "name", columnDefinition = "LONGTEXT")
	private String name;

	public int getImgId() {
		return imgId;
	}

	public void setImgId(int imgId) {
		this.imgId = imgId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ImagesProduct() {
		super();
	}

	public ImagesProduct(int imgId, String name) {
		super();
		this.imgId = imgId;
		this.name = name;
	}

}
