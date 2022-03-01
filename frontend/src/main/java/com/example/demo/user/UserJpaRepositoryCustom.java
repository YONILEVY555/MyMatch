package com.example.demo.user;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.transaction.Transactional;

import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.relationship.Relationship;
import com.example.demo.relationship.Status;
import com.example.demo.relationship.Type;


public interface UserJpaRepositoryCustom {
	
	public User findByPhoneOrEmailOrId(String val);
						
	public Set<User> retrievAllMatches(long id);
	
	public Set<User> retrievAllFriends(long id);
	
	public Set<User> retrievAllBlock(long id);
		
	public Set<User> getAllSecondCircleFriends(long id);
	
	public Set<User> getAllThirdCircleFriends(long id);
	
	public Set<User> getAllOptionMatch(long id);
		
	public Set<Object []> getAllPathes(long id,User match);
}
