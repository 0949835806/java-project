package project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import project.models.Comment;
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{

	@Query("SELECT cmt FROM Comment cmt WHERE cmt.product.proId = ?1")
	List<Comment> getCmtByProId(String proId);
}
