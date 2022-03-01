package com.example.demo.user;

import java.io.IOException;
import java.net.URI;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.example.demo.arrayhelpers.ArrayHelpers;
import com.example.demo.constants.Constants;
import com.example.demo.image.Image;
import com.example.demo.image.ImageJpaRepository;
import com.example.demo.message.Message;
import com.example.demo.preferences.PreferencesJpaRepository;
import com.example.demo.relationship.Relationship;
import com.example.demo.relationship.RelationshipJpaRepository;
import com.example.demo.relationship.Status;
import com.example.demo.relationship.Type;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class UserJpaResource {

	@Autowired
	private UserJpaRepository userJpaRepository;
	
	@Autowired
	PreferencesJpaRepository preferencesJpaRepository;
	
	@Autowired
    ImageJpaRepository imageJpaRepository;
	
	@Autowired
	private RelationshipJpaRepository relationshipJpaRepository;

	@GetMapping("/jpa/users")
	public Set<User> getAllUsers(){
		return userJpaRepository.retrievAllUsers();
	}
	
	@GetMapping("/jpa/users/{id}")
	public User getUser(@PathVariable String id){
		
//		if( userJpaRepository.existsById(id) )
//			throw new ResponseStatusException(
//					  HttpStatus.NOT_FOUND, "entity not found to update");
//		else {
			User user = userJpaRepository.findByPhoneOrEmailOrId(id);
			return user;
//		}
	
	}
	
	@PostMapping("/jpa/users")
	public ResponseEntity<URI>createUser(@RequestBody User user){
		
		User createdUser = userJpaRepository.save(user);
		
		preferencesJpaRepository.insertPreferences(createdUser.getId());
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
			.path("/{id}").buildAndExpand(createdUser.getId()).toUri();
        
		return new ResponseEntity<URI>(uri,HttpStatus.OK);
		
	}
	
	@PutMapping("/jpa/users/{id}")
	public ResponseEntity<User>updateUser(@PathVariable long id,
			                              @RequestBody User user){
	
		if( !userJpaRepository.existsById(id))
			throw new ResponseStatusException(
					  HttpStatus.NOT_FOUND, "entity not found to update");
		else {
			User userUpdated = userJpaRepository.save(user);	
			return new ResponseEntity<User>(userUpdated,HttpStatus.OK);
		}
		
	}
	
    
	@DeleteMapping("/jpa/users/{id}")
	public ResponseEntity<Void> deleteTodo( @PathVariable long id) {

		if( !userJpaRepository.existsById(id))
			throw new ResponseStatusException(
					  HttpStatus.NOT_FOUND, "entity not found to update");
		else {	
			userJpaRepository.deleteById(id);
			return ResponseEntity.ok().build(); 
		}
		
	}
	
	@GetMapping("/jpa/users/{id}/images")
	public Set<Image> getImage (@PathVariable long id){
		
		if( !userJpaRepository.existsById(id))
			throw new ResponseStatusException(
					  HttpStatus.NOT_FOUND, "entity not found to update");
		else				
			return userJpaRepository.findById(id).get().getImage();
		
	} 
	
	@PostMapping("/jpa/users/{id}/images")
	public ResponseEntity<Void> uploadImage (@PathVariable long id ,@RequestParam(value = "image") MultipartFile file) throws Exception {
				
		imageJpaRepository.insertImage(id,file);
		
		return ResponseEntity.ok().build();	
		
     }
	
	@PutMapping("/jpa/users/{id}/images/{imageId}")
	public ResponseEntity<Void> updateImage (@PathVariable long imageId ,@RequestParam(value = "image") MultipartFile file) throws Exception {
		
		imageJpaRepository.updateImage(imageId,file);
		
		return ResponseEntity.ok().build();	
		
     }
	
	@GetMapping("/jpa/users/{id}/relationships/{otherId}")
	public Relationship getRelationship(@PathVariable Long id, @PathVariable Long otherId, @RequestParam(value = "type") String type){
		
		Relationship relationship = relationshipJpaRepository.retrievRelationshipByIdAndOtherIdAndType(id,otherId,type);
		
		if(relationship!=null)
		   return relationship;
		else {
			throw new ResponseStatusException(
					  HttpStatus.NOT_FOUND, "entity not found"
			);
		}
				                   
	}
	
	@GetMapping("/jpa/users/{id}/relationships")
	public Set<Relationship> getAllRelationships(@PathVariable Long id, @RequestParam(value = "type") String type, @RequestParam(value = "status") String status ){
				           
		return relationshipJpaRepository.retrievAllRelationshipByTypeAndStatus( id, type, status );
				                   
	}
	
	@PostMapping("/jpa/users/{id}/relationships")
	public ResponseEntity<Void>createRelationship (@RequestParam(value = "userId") Long userId,
												   @RequestParam(value = "otherId") Long otherId,
			                                       Type type,
			                                       Status status
		                                           ){

		
		relationshipJpaRepository.insertRelationship(userId,otherId,type,status);
		
		return ResponseEntity.ok().build();	
	
	}
	
	@PutMapping("/jpa/users/{id}/relationships")
	public ResponseEntity<Void>updateRelationship (@RequestParam(value = "userId") Long userId,
												   @RequestParam(value = "otherId") Long otherId,
			                                       Type type,
			                                       Status status
		                                           ){
		
		relationshipJpaRepository.updateRelationship(userId,otherId,type,status);
		
		return ResponseEntity.ok().build();	
	
	}
	
	@DeleteMapping("/jpa/users/{id}/relationships")
	public ResponseEntity<Void> deleteRelationships(@RequestParam(value = "userId") Long userId,
			   										@RequestParam(value = "otherId") Long otherId){
		
		User user = userJpaRepository.findById(userId).get();
		User other = userJpaRepository.findById(otherId).get();
		
		Relationship relationship = relationshipJpaRepository.findBySourceAndTarget(user,other);
		
		if(relationship == null)
			relationship = relationshipJpaRepository.findBySourceAndTarget(other,user);
		
		relationshipJpaRepository.delete(relationship);
		
		return ResponseEntity.ok().build();	
		
	}
	
	@GetMapping("/jpa/users/{id}/friends")
	public Set<User> getFriends(@PathVariable Long id){
		
		 return userJpaRepository.retrievAllFriends(id);
	}
	

	@GetMapping("/jpa/users/{id}/matches")
	public Set<User> getMatches(@PathVariable Long id){
		
		return userJpaRepository.retrievAllMatches(id);
		
	}
	
	@GetMapping("/jpa/users/{id}/blocked")
	public Set<User> getBlocked(@PathVariable Long id){
		
		return userJpaRepository.retrievAllBlock(id);
		
	}
	
	@GetMapping("/jpa/users/{id}/optional_match")
	public Set<User> optionalMatch (@PathVariable long id){
		
		return userJpaRepository.getAllOptionMatch(id);
		
    }
	
	@GetMapping("/jpa/users/{id}/pathes/{matchId}")
	public Set<Object []> pathes (@PathVariable long id,@PathVariable long matchId){
		
		User match = userJpaRepository.findById(matchId).get();
		
		return userJpaRepository.getAllPathes(id,match);
		
    }
	
}

//Logger logger = Logger.getLogger(UserJpaResource.class.getName()); 
//
//logger.log(Level.INFO, "MyimageId: {0}", new Object[] { imageId});

