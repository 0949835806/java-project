package project.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.models.Comment;
import project.repository.CommentRepository;
import project.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService{
	@Autowired
	private CommentRepository commentRepository;

	@Override
	public  Comment save(Comment cmt) {
		return commentRepository.save(cmt);
	}

	@Override
	public List<Comment> findAll() {
		return commentRepository.findAll();
	}

	@Override
	public Optional<Comment> findById(Integer id) {
		return commentRepository.findById(id);
	}

	@Override
	public void deleteById(Integer id) {
		commentRepository.deleteById(id);
	}

	@Override
	public Comment getById(Integer id) {
		return commentRepository.getById(id);
	}

	@Override
	public List<Comment> getCmtByProId(String proId) {
		return commentRepository.getCmtByProId(proId);
	}
	
	

}
