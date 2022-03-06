package com.example.demo.user;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.arrayhelpers.ArrayHelpers;
import com.example.demo.constants.Constants;
import com.example.demo.image.Image;
import com.example.demo.image.ImageJpaRepository;
import com.example.demo.preferences.Gender;
import com.example.demo.preferences.Preferences;
import com.example.demo.preferences.PreferencesJpaRepository;
import com.example.demo.relationship.Relationship;
import com.example.demo.relationship.RelationshipJpaRepository;
import com.example.demo.relationship.Status;
import com.example.demo.relationship.Type;
import com.example.demo.validatehelpers.ValidateHelpers;

public class UserJpaRepositoryImpl implements UserJpaRepositoryCustom  {
   
	@Autowired
    @Lazy
    UserJpaRepository userJpaRepository; 
	
	@Autowired
    @Lazy
    RelationshipJpaRepository relationshipJpaRepository;
	
	@Autowired
    @Lazy
    ImageJpaRepository imageJpaRepository;
	
	@Autowired
    @Lazy
	PreferencesJpaRepository preferencesJpaRepository;
	
	EntityManager em;
	
	public User findByPhoneOrEmailOrId(String val) {
		
		if(ValidateHelpers.emailValidate(val))
			return userJpaRepository.findByEmail(val);
		else 
			if(ValidateHelpers.phoneNumberValidate(val))
				return userJpaRepository.findByPhone(val);
			else 
				return userJpaRepository.findById(Long.parseLong(val)).get();
	}
    
	
	public Set<User> retrievAllMatches(long id){	
    
		return ArrayHelpers.mergeSet(userJpaRepository.retrievMyMatches(id),
									 userJpaRepository.retrievImMatches(id));
		
	}
	
	public Set<User> retrievAllFriends(long id){
		
		return ArrayHelpers.mergeSet(userJpaRepository.retrievMyFriends(id),
				 userJpaRepository.retrievImFriends(id));
		
	}
	
	public Set<User> retrievAllBlock(long id){
		
		return ArrayHelpers.mergeSet(userJpaRepository.retrievMyBlock(id),
				 userJpaRepository.retrievImBlock(id));
		
	}
	    
	public Set<User> getAllSecondCircleFriends(long id){
				
		Set<User> firstCircleFriends  = userJpaRepository.retrievAllFriends(id);

		return ArrayHelpers.mergeSet(ArrayHelpers.mergeSet(userJpaRepository.retrievSecondCircleFriendsImRelationshipOfFirstDirection(id,firstCircleFriends),
															userJpaRepository.retrievSecondCircleFriendsImRelationshipOfSecondDirection(id,firstCircleFriends)),
									ArrayHelpers.mergeSet(userJpaRepository.retrievSecondCircleFriendsMyRelationshipFirstDirection(id,firstCircleFriends),
															userJpaRepository.retrievSecondCircleFriendsMyRelationshipSecondDirection(id,firstCircleFriends)));
	    
    }
	
	public Set<User> getAllThirdCircleFriends(long id){
				
		Set<User> firstCircleFriends  = userJpaRepository.retrievAllFriends(id);

		Set<User> ThirdCircleFriendsMyRelationship = ArrayHelpers.mergeSet(ArrayHelpers.mergeSet(userJpaRepository.retrievThirdCircleFriendsMyRelationshipFirstDirection(id,firstCircleFriends),
																								userJpaRepository.retrievThirdCircleFriendsMyRelationshipSecondDirection(id,firstCircleFriends)),
																			ArrayHelpers.mergeSet(userJpaRepository.retrievThirdCircleFriendsMyRelationshipThirdDirection(id,firstCircleFriends),
																								userJpaRepository.retrievThirdCircleFriendsMyRelationshipFourthDirection(id,firstCircleFriends)));
		
		Set<User> ThirdCircleFriendsImRelationshipOf = ArrayHelpers.mergeSet(ArrayHelpers.mergeSet(userJpaRepository.retrievThirdCircleFriendsImRelationshipOfFirstDirection(id,firstCircleFriends),
																									userJpaRepository.retrievThirdCircleFriendsImRelationshipOfSecondDirection(id,firstCircleFriends)),
																			ArrayHelpers.mergeSet(userJpaRepository.retrievThirdCircleFriendsImRelationshipOfThirdDirection(id,firstCircleFriends),
																									userJpaRepository.retrievThirdCircleFriendsMyRelationshipFourthDirection(id,firstCircleFriends)));
		
		return ArrayHelpers.mergeSet(ThirdCircleFriendsMyRelationship,ThirdCircleFriendsImRelationshipOf);
			
    }
	
	public Set<User> getAllOptionMatch(long id){
		
		User user = userJpaRepository.findById(id).get();
		
		Preferences preferences = preferencesJpaRepository.findByUser(user);
		
//		return  ArrayHelpers.mergeSet(getAllThirdCircleFriends(id),getAllSecondCircleFriends(id));

		Set<User> allOptionMatch = ArrayHelpers.mergeSet(getAllThirdCircleFriends(id),getAllSecondCircleFriends(id));
		
		Set<User> fillterOptionMatch = ArrayHelpers.filterByAgeAndGender(allOptionMatch,preferences.getMaxAge(),preferences.getMaxDistace(),preferences.getGender());
		
		Logger logger = Logger.getLogger(UserJpaRepositoryImpl.class.getName()); 
		 
		logger.log(Level.INFO, "myFillterOptionMatch: {0}", new Object[] {fillterOptionMatch});
		 
		return fillterOptionMatch;
		
	}
	
	public Set<Object []> getAllSecondCirclePathes(long id,User match){
				
		Set<User> firstCircleFriends  = userJpaRepository.retrievAllFriends(id);

		return ArrayHelpers.mergeSet(ArrayHelpers.mergeSet(userJpaRepository.retrievPath1(id,match,firstCircleFriends),
															userJpaRepository.retrievPath2(id,match,firstCircleFriends)),
									ArrayHelpers.mergeSet(userJpaRepository.retrievPath3(id,match,firstCircleFriends),
															userJpaRepository.retrievPath4(id,match,firstCircleFriends)));
	    
    }
	
	public Set<Object []> getAllThirdCirclePathes(long id,User match){
				
		Set<User> firstCircleFriends  = userJpaRepository.retrievAllFriends(id);

		Set<Object []> ThirdCircleFriendsMyRelationship = ArrayHelpers.mergeSet(ArrayHelpers.mergeSet(userJpaRepository.retrievPath5(id,match,firstCircleFriends),
																										userJpaRepository.retrievPath6(id,match,firstCircleFriends)),
														  						ArrayHelpers.mergeSet(userJpaRepository.retrievPath7(id,match,firstCircleFriends),
																										userJpaRepository.retrievPath8(id,match,firstCircleFriends)));
		
		Set<Object []> ThirdCircleFriendsImRelationshipOf = ArrayHelpers.mergeSet(ArrayHelpers.mergeSet(userJpaRepository.retrievPath9(id,match,firstCircleFriends),
																										userJpaRepository.retrievPath10(id,match,firstCircleFriends)),
																				  ArrayHelpers.mergeSet(userJpaRepository.retrievPath11(id,match,firstCircleFriends),
																						  				userJpaRepository.retrievPath12(id,match,firstCircleFriends)));
		
		return ArrayHelpers.mergeSet(ThirdCircleFriendsMyRelationship,ThirdCircleFriendsImRelationshipOf);
			
    }
	
	public Set<Object []> getAllPathes(long id,User match){
		
		return ArrayHelpers.mergeSet(getAllThirdCirclePathes(id,match),getAllSecondCirclePathes(id,match));
		
	}


	
}
