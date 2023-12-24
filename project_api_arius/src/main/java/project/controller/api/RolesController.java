package project.controller.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.models.Role;
import project.service.RoleService;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin("http://10.0.2.2:8081")
//@CrossOrigin("http://localhost:4200")
public class RolesController {
	@Autowired
	private RoleService roleService;
	
	@GetMapping("/")
	public ResponseEntity<List<Role>> getRoles(){
		return ResponseEntity.ok(roleService.findAll());
	}

}
