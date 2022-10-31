package project.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "user")
public class User {
	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userid;
	
	@Column(name = "user_name")
//	@NotEmpty(message = "họ và tên khộng được để trống")
	private String username;
	
	@Column(name = "full_name")
	private String fullName;
	
	@Column(name = "password")
//	@NotEmpty(message = "pasword ko được để trống")
	private String password;
	
	@Column(name = "email")
//	@NotEmpty(message = "email ko được để trống")
//	@Email
	private String email;
	
	@Column(name = "phone")
//	@NotEmpty(message = "sdt ko được để trống")
	private String phone;
	
	@Column(name = "address")
	private String address;

	@ManyToMany(fetch = FetchType.EAGER)
	private Collection<Role> roles = new ArrayList<Role>();

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Orders> listOrder;
	
	@OneToMany(mappedBy = "users")
	@JsonIgnore
	private List<Comment> comment; 
	
	@OneToMany(mappedBy = "users")
	@JsonIgnore
	private List<WishList> wishlist;
	

	public int getUserid() {
		return userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


	public Collection<Role> getRoles() {
		return roles;
	}

	public void setRoles(Collection<Role> roles) {
		this.roles = roles;
	}


	

	public List<Orders> getListOrder() {
		return listOrder;
	}

	public void setListOrder(List<Orders> listOrder) {
		this.listOrder = listOrder;
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

	public User() {
		// TODO Auto-generated constructor stub
	}

	public User(int userid, String username, String fullName, String password, String email, String phone,
			String address, Collection<Role> roles, List<Orders> listOrder, List<Comment> comment,
			List<WishList> wishlist) {
		super();
		this.userid = userid;
		this.username = username;
		this.fullName = fullName;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.roles = roles;
		this.listOrder = listOrder;
		this.comment = comment;
		this.wishlist = wishlist;
	}


	
}
