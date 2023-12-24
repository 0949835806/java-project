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
import javax.validation.constraints.Pattern;

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

	@Column(name = "email")
	private String email;

	@Column(name = "password")
//	@NotEmpty(message = "pasword ko được để trống")
	private String password;

	@Column(name = "reset_password_token")
	private String resetPassword;

	@Column(name = "reset_password_token_expire")
	private String resetPasswordExpire;

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

	@OneToMany(mappedBy = "userId")
	@JsonIgnore
	private List<Address> address;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getResetPassword() {
		return resetPassword;
	}

	public void setResetPassword(String resetPassword) {
		this.resetPassword = resetPassword;
	}

	public String getResetPasswordExpire() {
		return resetPasswordExpire;
	}

	public void setResetPasswordExpire(String resetPasswordExpire) {
		this.resetPasswordExpire = resetPasswordExpire;
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

	public List<Address> getAddress() {
		return address;
	}

	public void setAddress(List<Address> address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public User() {
		// TODO Auto-generated constructor stub
	}

	public User(int userid, String username, String email, String password, String resetPassword,
			String resetPasswordExpire, Collection<Role> roles, List<Orders> listOrder, List<Comment> comment,
			List<WishList> wishlist, List<Address> address) {
		super();
		this.userid = userid;
		this.username = username;
		this.email = email;
		this.password = password;
		this.resetPassword = resetPassword;
		this.resetPasswordExpire = resetPasswordExpire;
		this.roles = roles;
		this.listOrder = listOrder;
		this.comment = comment;
		this.wishlist = wishlist;
		this.address = address;
	}

}
