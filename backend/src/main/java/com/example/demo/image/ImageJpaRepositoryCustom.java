package com.example.demo.image;

import org.springframework.web.multipart.MultipartFile;

public interface ImageJpaRepositoryCustom {
	
	public void insertImage(long id, MultipartFile multipartImage) throws Exception;
	public void updateImage(long imageId, MultipartFile multipartImage) throws Exception;
}
