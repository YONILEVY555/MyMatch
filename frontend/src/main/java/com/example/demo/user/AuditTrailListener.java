package com.example.demo.user;

import javax.persistence.PostPersist;
import javax.persistence.PostUpdate;
import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import com.example.demo.preferences.Preferences;
import com.example.demo.preferences.PreferencesJpaRepository;

import java.util.logging.Level;
import java.util.logging.Logger;

public class AuditTrailListener {

//	@Autowired
//    @Lazy
//    UserJpaRepository userJpaRepository; 
//
//	@PostPersist
//	private void beforeAnyRemove(User user) {
//		
//	userJpaRepository.flush();	
//	this.createDefaultPreferences(createdUser);
//	
//	
//   }
//	
//	private void createDefaultPreferences(User user) {	
//		
//		Logger logger= Logger.getLogger(User.class.getName()); 	
//		logger.log(Level.INFO, "myUser: {0}  ", new Object[] {user.getId()});
//		
//		
//		userJpaRepository.insertPreferences(user.getId());	
//		
//    }
//	

//	@PreRemove
//	private void beforeAnyRemove(User user) {
//		
//		this.removeFriendsFromFriendOf(user);
//		this.removeMatchesFromMatcheOf(user);
//		
//	}
//	
//
//	private void removeFriendsFromFriendOf(User user) {		
//	    for (User u : user.getFriendOf()) {
//	        u.getFriends().remove(user);
//	    }
//	}
//	
//
//	private void removeMatchesFromMatcheOf(User user) {		
//	    for (User u : user.getMatcheOf()) {
//	        u.getMatches().remove(user);
//	    }
//	}
	
}
