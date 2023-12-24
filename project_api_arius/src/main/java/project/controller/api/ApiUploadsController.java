package project.controller.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import project.service.IStorageService;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin("http://10.0.2.2:8081")
//@CrossOrigin("http://localhost:4200")
public class ApiUploadsController {

	@Autowired
	private IStorageService imageService;
	
	@PostMapping("")
	public ResponseEntity<?> uploadsFile(@RequestParam("Files") MultipartFile file){
		String files = imageService.storeFile(file);
		return new ResponseEntity<String>(files, HttpStatus.OK);
	}
}

