package project.service;

import java.util.List;
import java.util.Optional;

import project.models.Comment;

public interface CommentService {

	Comment getById(Integer id);

	void deleteById(Integer id);

	Optional<Comment> findById(Integer id);

	List<Comment> findAll();

	Comment save(Comment cmt);

	List<Comment> getCmtByProId(String proId);

}
