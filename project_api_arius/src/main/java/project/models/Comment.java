package project.models;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "comment")
public class Comment {

	@Id
	@Column(name = "comment_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int commentId;
	
	@Column(name = "text")
	private String text;
	
	@Column(name = "create_date")
	private Date createDate;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User users;
	
	@ManyToOne
	@JoinColumn(name = "pro_id",referencedColumnName = "pro_id")
	private Product product;

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public User getUsers() {
		return users;
	}

	public void setUsers(User users) {
		this.users = users;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
	
	public Comment() {
		// TODO Auto-generated constructor stub
	}

	public Comment(int commentId, String text, Date createDate, User users, Product product) {
		super();
		this.commentId = commentId;
		this.text = text;
		this.createDate = createDate;
		this.users = users;
		this.product = product;
	}
	
	
}
