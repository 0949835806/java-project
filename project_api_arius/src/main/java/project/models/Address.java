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
@Table(name = "Address")
public class Address {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "name")
	private String name;

	@Column(name = "fullName")
	private String fullName;

	@Column(name = "mobileNo")
	private String mobileNo;

	@Column(name = "houseNo")
	private String houseNo;

	@Column(name = "street")
	private String street;

	@Column(name = "landmark")
	private String landmark;

	@Column(name = "postalCode")
	private int postalCode;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User userId;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getHouseNo() {
		return houseNo;
	}

	public void setHouseNo(String houseNo) {
		this.houseNo = houseNo;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getLandmark() {
		return landmark;
	}

	public void setLandmark(String landmark) {
		this.landmark = landmark;
	}

	public int getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(int postalCode) {
		this.postalCode = postalCode;
	}

	public User getUserId() {
		return userId;
	}

	public void setUserId(User userId) {
		this.userId = userId;
	}

	public Address() {
		super();
	}

	public Address(int id, String name, String fullName, String mobileNo, String houseNo, String street,
			String landmark, int postalCode, User userId) {
		super();
		this.id = id;
		this.name = name;
		this.fullName = fullName;
		this.mobileNo = mobileNo;
		this.houseNo = houseNo;
		this.street = street;
		this.landmark = landmark;
		this.postalCode = postalCode;
		this.userId = userId;
	}

}
