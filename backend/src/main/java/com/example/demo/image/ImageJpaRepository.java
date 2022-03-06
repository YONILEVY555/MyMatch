package com.example.demo.image;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

@Repository
public interface ImageJpaRepository extends JpaRepository<Image, Long> {

	public void insertImage(long id, MultipartFile multipartImage) throws Exception;
	public void updateImage(long imageId, MultipartFile multipartImage) throws Exception;
	
}
