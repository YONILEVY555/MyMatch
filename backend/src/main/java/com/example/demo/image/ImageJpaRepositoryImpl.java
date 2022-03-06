package com.example.demo.image;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.preferences.PreferencesJpaRepositoryCustom;
import com.example.demo.user.User;
import com.example.demo.user.UserJpaRepository;
import com.example.demo.user.UserJpaRepositoryImpl;

public class ImageJpaRepositoryImpl implements ImageJpaRepositoryCustom {
	
	@Autowired
	private UserJpaRepository userJpaRepository;
	
	@Autowired
    ImageJpaRepository imageJpaRepository;
	
	public void insertImage(long id, MultipartFile multipartImage) throws Exception {	
		
		User user = userJpaRepository.findById(id).get();
		
	    Image image = new Image();
	    
	    image.setName(multipartImage.getOriginalFilename());
	    
        image.setContent(multipartImage.getBytes());
             
        user.addImage(image);
        
        image.setUser(user);
        
        imageJpaRepository.save(image);
        
	}
	
	public void updateImage(long imageId, MultipartFile multipartImage) throws Exception {	
		
	    Image image = imageJpaRepository.findById(imageId).get();
	    
	    Logger logger= Logger.getLogger(UserJpaRepositoryImpl.class.getName()); 
		
		logger.log(Level.INFO, "Myimage: {0}", new Object[] { image });
	    
	    image.setName(multipartImage.getOriginalFilename());
	    
        image.setContent(multipartImage.getBytes());
                     
        imageJpaRepository.save(image);
        
	}

}
