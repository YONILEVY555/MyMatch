package com.example.demo.relationship;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.arrayhelpers.ArrayHelpers;
import com.example.demo.user.User;
import com.example.demo.user.UserJpaRepository;

public class RelationshipJpaRepositoryImpl implements RelationshipJpaRepositoryCustom {
	
	@Autowired
	private RelationshipJpaRepository relationshipJpaRepository;
	
	@Autowired
	private UserJpaRepository userJpaRepository;
	
	public Relationship retrievRelationshipByIdAndOtherIdAndType(Long id,Long otherId, String type) {
		
		Relationship r1 = relationshipJpaRepository.retrievImRelationshipByIdAndOtherIdAndType(id, otherId, type);
		Relationship r2 = relationshipJpaRepository.retrievMyRelationshipByIdAndOtherIdAndType(id, otherId, type);

		if( r1 != null )
			return r1;
		else
			if( r2 != null )
				return r2;
			
	   return null;
	}
	
	public void insertRelationship(Long userId,Long otherId,Type type,Status status) {	
		
		User user = userJpaRepository.findById(userId).get();
		User other = userJpaRepository.findById(otherId).get();
		
		Relationship relationship = new Relationship(user,other,type,status);
		
		user.addMyRelationship(relationship);
		
		relationship.setSource(user);
		relationship.setTarget(other);
		
		userJpaRepository.save(user);
		relationshipJpaRepository.save(relationship);
		
	}
	
	public void updateRelationship(Long userId,Long otherId,Type type,Status status) {	
        
		User user = userJpaRepository.findById(userId).get();
		User other = userJpaRepository.findById(otherId).get();
		
		Relationship relationship = relationshipJpaRepository.findBySourceAndTarget(user,other);
			
		if(relationship == null)
			relationship = relationshipJpaRepository.findBySourceAndTarget(other,user);
		
		relationship.setType(type);
		relationship.setStatus(status);
		
		relationshipJpaRepository.save(relationship);

	}
	
	public Set<Relationship> retrievAllRelationshipByTypeAndStatus(long id,String type, String status){	
	    
		return ArrayHelpers.mergeSet(relationshipJpaRepository.retrievMyRelationshipByTypeAndStatus(id,type,status),
									 relationshipJpaRepository.retrievImRelationshipByTypeAndStatus(id,type,status));
		
	}
	
	

}
