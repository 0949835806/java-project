package project.controller.api;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.models.Comment;
import project.service.CommentService;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(sf, true));
	}
	
	
	@GetMapping("/")
	public ResponseEntity<List<Comment>> getListComment(){
		return ResponseEntity.ok(commentService.findAll());
	}
	
	@GetMapping("/getCmtById/{commentId}")
	public ResponseEntity<Object> getCmtById(@PathVariable("commentId")Integer commentId){
		Comment cmt = commentService.findById(commentId).get();
		return ResponseEntity.ok(cmt);
	}
	
	@GetMapping("/getCmtByproId/{proId}")
	public ResponseEntity<List<Comment>> getCmtByproId(@PathVariable("proId")String proId){
		return ResponseEntity.ok(commentService.getCmtByProId(proId));
	}
	
	@PostMapping("/saveComment")
	public ResponseEntity<String> saveComment(@RequestBody Comment comment){
		try {
			commentService.save(comment);
			return ResponseEntity.ok("Insert successfull");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(400).body("Insert failed!");
		}
	}
	
	@PutMapping("/editComment/{commentId}")
	public ResponseEntity<String> editComment(@RequestBody Comment comment, @PathVariable("commentId")Integer commentId){
		try {
			Comment cmt = commentService.findById(commentId).get();
			cmt.setText(comment.getText());
			cmt.setCreateDate(comment.getCreateDate());
			cmt.setProduct(comment.getProduct());
			cmt.setUsers(comment.getUsers());
			commentService.save(comment);
			return ResponseEntity.ok("Update successfull");
		} catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(400).body("Update failed!");
		}
	}
	
	@DeleteMapping("/deleteComment/{commentId}")
	public void deleteComment(@PathVariable("commentId")Integer commentId) {
		commentService.deleteById(commentId);
	}
	
}
