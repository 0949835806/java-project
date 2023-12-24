package project.service;

import java.nio.file.Path;
import java.util.stream.Stream;

import org.springframework.web.multipart.MultipartFile;

public interface IStorageService {
	String storeFile(MultipartFile file);

	Stream<Path> loadAll();

	byte[] readFileContent(String fillName);

	void deleteAllFiles();
}
