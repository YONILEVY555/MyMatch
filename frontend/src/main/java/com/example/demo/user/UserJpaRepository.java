package com.example.demo.user;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.message.Message;
import com.example.demo.relationship.Relationship;
import com.example.demo.relationship.Status;
import com.example.demo.relationship.Type;

@Repository
public interface UserJpaRepository extends JpaRepository<User, Long>, UserJpaRepositoryCustom{
	
	@Query("select u from User u")
	Set<User> retrievAllUsers();
	
	User findByPhone(String phone);
	User findByEmail(String email);
	User findByPhoneOrEmailOrId(String val);
		 
	@Query("select r.target from User u JOIN u.myRelationship r where u.id=:id and cast(r.type as text) = 'M' ")
	Set<User> retrievMyMatches(@Param("id") Long id);
	
	@Query("select r.source from User u JOIN u.imRelationshipOf r where u.id=:id and cast(r.type as text) = 'M' ")
	Set<User> retrievImMatches(@Param("id") Long id);
	
	public Set<User> retrievAllMatches(long id);
	
	@Query("select r.target from User u JOIN u.myRelationship r where u.id=:id and cast(r.type as text) = 'F' ")
	Set<User> retrievMyFriends(@Param("id") Long id);
	
	@Query("select r.source from User u JOIN u.imRelationshipOf r where u.id=:id and cast(r.type as text) = 'F' ")
	Set<User> retrievImFriends(@Param("id") Long id);
	
	public Set<User> retrievAllFriends(long id);
	
	@Query("select r.target from User u JOIN u.myRelationship r where u.id=:id and cast(r.type as text) = 'B' ")
	Set<User> retrievMyBlock(@Param("id") Long id);
	
	@Query("select r.source from User u JOIN u.imRelationshipOf r where u.id=:id and cast(r.type as text) = 'B' ")
	Set<User> retrievImBlock(@Param("id") Long id);
	
	@Query("select m from User u JOIN u.myMessage m where u.id=:id and m.target.id =:otherId and m.source.id =:id")
    		Set<Message> retrievChatByIdAndOtherId(@Param("id") Long id, @Param("otherId") Long otherId);
	
	public Set<User> retrievAllBlock(long id);	
	
	@Query(	  " SELECT r2.target"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2 "
	+ " WHERE "
	+ "		  r2.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       r1.target = r2.source AND"
	+ "       r2.target.id <> :id      ")
	Set<User> retrievSecondCircleFriendsMyRelationshipFirstDirection( @Param("id") Long id, 
																	  @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	@Query(	  " SELECT r2.source"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2 "
	+ " WHERE "
	+ " 	  r2.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       r1.target = r2.target AND"
	+ "       r2.source.id <> :id      ")
	Set<User> retrievSecondCircleFriendsMyRelationshipSecondDirection( @Param("id") Long id ,
															   @Param("firstCircleFriends") Set<User> firstCircleFriends );
			
			
	@Query(	  " SELECT r2.source"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2 "
	+ " WHERE "
	+ " 	  r2.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       r1.source = r2.target AND"
	+ "       r2.source.id <> :id      ")
	Set<User> retrievSecondCircleFriendsImRelationshipOfFirstDirection( @Param("id") Long id,
																		@Param("firstCircleFriends") Set<User> firstCircleFriends );

	
	@Query(	  " SELECT r2.target"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2 "
	+ " WHERE "
	+ " 	  r2.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       r1.source = r2.source AND"
	+ "       r2.target.id <> :id      ")
	Set<User> retrievSecondCircleFriendsImRelationshipOfSecondDirection( @Param("id") Long id, 
																		 @Param("firstCircleFriends") Set<User> firstCircleFriends );
	
	public Set<User> getAllSecondCircleFriends(long id);
	
	@Query(	  " SELECT r3.target"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2, User u3 JOIN u3.myRelationship r3 "
	+ " WHERE "
	+ "		  r3.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.target = r2.source AND"
	+ "       r2.target = r3.source AND"
	+ "       r3.target.id <> :id      ")
	Set<User> retrievThirdCircleFriendsMyRelationshipFirstDirection( @Param("id") Long id,
			 														 @Param("firstCircleFriends") Set<User> firstCircleFriends);

	@Query(	  " SELECT r3.source"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2, User u3 JOIN u3.myRelationship r3 "
	+ " WHERE "
	+ "		  r3.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.target = r2.source AND"
	+ "       r2.target = r3.target AND"
	+ "       r3.source.id <> :id      ")
	Set<User> retrievThirdCircleFriendsMyRelationshipSecondDirection( @Param("id") Long id,
			 														  @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	@Query(	  " SELECT r3.target"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2, User u3 JOIN u3.myRelationship r3 "
	+ " WHERE "
	+ "		  r3.target NOT IN :firstCircleFriends AND "	
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.target = r2.target AND"
	+ "       r2.source = r3.source AND"
	+ "       r3.target.id <> :id      ")
	Set<User> retrievThirdCircleFriendsMyRelationshipThirdDirection( @Param("id") Long id,
																	 @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	@Query(	  " SELECT r3.source"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2, User u3 JOIN u3.myRelationship r3 "
	+ " WHERE "
	+ "		  r3.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.target = r2.target AND"
	+ "       r2.source = r3.target AND"
	+ "       r3.source.id <> :id      ")
	Set<User> retrievThirdCircleFriendsMyRelationshipFourthDirection( @Param("id") Long id,
																	  @Param("firstCircleFriends") Set<User> firstCircleFriends);
	//start 
	
	@Query(	  " SELECT r3.source"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2, User u3 JOIN u3.imRelationshipOf r3 "
	+ " WHERE "
	+ "		  r3.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.source = r2.target AND"
	+ "       r2.source = r3.target AND"
	+ "       r3.source.id <> :id      ")
	Set<User> retrievThirdCircleFriendsImRelationshipOfFirstDirection( @Param("id") Long id,
			 											      		   @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	//  |2|1|
	//  |3|2| => return 4
	//  |3|4|
	@Query(	  " SELECT r3.target"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2, User u3 JOIN u3.imRelationshipOf r3 "
	+ " WHERE "
	+ "		  r3.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.source = r2.target AND"
	+ "       r2.source = r3.source AND"
	+ "       r3.target.id <> :id      ")
	Set<User> retrievThirdCircleFriendsImRelationshipOfSecondDirection( @Param("id") Long id,
			 														    @Param("firstCircleFriends") Set<User> firstCircleFriends);

	@Query(	  " SELECT r3.source"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2, User u3 JOIN u3.imRelationshipOf r3 "
	+ " WHERE "
	+ "		  r3.source NOT IN :firstCircleFriends AND "	
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.source = r2.source AND"
	+ "       r2.target = r3.target AND"
	+ "       r3.source.id <> :id      ")
	Set<User> retrievThirdCircleFriendsImRelationshipOfThirdDirection( @Param("id") Long id,
																	 @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	@Query(	  " SELECT r3.target"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2, User u3 JOIN u3.imRelationshipOf r3 "
	+ " WHERE "
	+ "		  r3.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.source = r2.source AND"
	+ "       r2.target = r3.source AND"
	+ "       r3.target.id <> :id      ")
	Set<User> retrievThirdCircleFriendsImRelationshipOfFourthDirection( @Param("id") Long id,
																	    @Param("firstCircleFriends") Set<User> firstCircleFriends);
    
	public Set<User> getAllThirdCircleFriends(long id);
	
	public Set<User> getAllOptionMatch(long id);
	
	@Query(	  " SELECT r1.target"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2 "
	+ " WHERE "
	+ "		  r2.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       r1.target = r2.source  AND"
	+ "       r2.target = :MatchId")
	Set<Object []> retrievPath1( @Param("id") Long id, 
								 @Param("MatchId") User MatchId,
								 @Param("firstCircleFriends") Set<User> firstCircleFriends);
	

	
	@Query(	  " SELECT r1.target"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2 "
	+ " WHERE "
	+ " 	  r2.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       r1.target = r2.target AND"
	+ "       r2.source = :MatchId")
	Set<Object []> retrievPath2( @Param("id") Long id ,
									@Param("MatchId") User MatchId,
								 @Param("firstCircleFriends") Set<User> firstCircleFriends );
	
	@Query(	  " SELECT r1.source"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2 "
	+ " WHERE "
	+ " 	  r2.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       r1.source = r2.target AND"
	+ "       r2.source = :MatchId")
	Set<Object []> retrievPath3( @Param("id") Long id,
								 @Param("MatchId") User MatchId,
								 @Param("firstCircleFriends") Set<User> firstCircleFriends );
	
	@Query(	  " SELECT r1.source"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2 "
	+ " WHERE "
	+ " 	  r2.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       r1.source = r2.source AND" 
	+ "       r2.target = :MatchId")
	Set<Object []> retrievPath4( @Param("id") Long id, 
									@Param("MatchId") User MatchId,
								 @Param("firstCircleFriends") Set<User> firstCircleFriends );
	
	@Query(	  " SELECT r1.target, r2.target"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2, User u3 JOIN u3.myRelationship r3 "
	+ " WHERE "
	+ "		  r3.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.target = r2.source AND"
	+ "       r2.target = r3.source AND"
	+ "       r3.target = :MatchId")
	Set<Object []> retrievPath5( @Param("id") Long id,
								@Param("MatchId") User MatchId,
			 					 @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	@Query(	  " SELECT  r1.target, r2.target"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2, User u3 JOIN u3.myRelationship r3 "
	+ " WHERE "
	+ "		  r3.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.target = r2.source AND"
	+ "       r2.target = r3.target AND"
	+ "       r3.source = :MatchId")
	Set<Object []> retrievPath6( @Param("id") Long id,
									@Param("MatchId") User MatchId,
			 					 @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	@Query(	  " SELECT r1.target, r2.source"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2, User u3 JOIN u3.myRelationship r3 "
	+ " WHERE "
	+ "		  r3.target NOT IN :firstCircleFriends AND "	
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.target = r2.target AND"
	+ "       r2.source = r3.source AND"
	+ "        r3.target = :MatchId")
	Set<Object []> retrievPath7( @Param("id") Long id,
									@Param("MatchId") User MatchId,
								 @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	@Query(	  " SELECT r1.target, r2.source"
	+ " FROM User u1 JOIN u1.myRelationship r1, User u2 JOIN u2.myRelationship r2, User u3 JOIN u3.myRelationship r3 "
	+ " WHERE "
	+ "		  r3.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.target = r2.target AND"
	+ "       r2.source = r3.target AND"
	+ "       r3.source = :MatchId")
	Set<Object []> retrievPath8( @Param("id") Long id,
									@Param("MatchId") User MatchId,
								 @Param("firstCircleFriends") Set<User> firstCircleFriends);

	@Query(	  " SELECT r1.source, r2.source"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2, User u3 JOIN u3.imRelationshipOf r3 "
	+ " WHERE "
	+ "		  r3.source NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.source = r2.target AND"
	+ "       r2.source = r3.target AND"
	+ "       r3.source = :MatchId")
	Set<Object []> retrievPath9( @Param("id") Long id,
									@Param("MatchId") User MatchId,
			 					 @Param("firstCircleFriends") Set<User> firstCircleFriends);

	
	@Query(	  " SELECT r1.source, r2.source"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2, User u3 JOIN u3.imRelationshipOf r3 "
	+ " WHERE "
	+ "		  r3.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.source = r2.target AND"
	+ "       r2.source = r3.source AND"
	+ "       r3.target = :MatchId")
	Set<Object []> retrievPath10( @Param("id") Long id,
									@Param("MatchId") User MatchId,
			 					  @Param("firstCircleFriends") Set<User> firstCircleFriends);

	@Query(	  " SELECT r1.source, r2.target"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2, User u3 JOIN u3.imRelationshipOf r3 "
	+ " WHERE "
	+ "		  r3.source NOT IN :firstCircleFriends AND "	
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.source = r2.source AND"
	+ "       r2.target = r3.target AND"
	+ "       r3.source = :MatchId")
	Set<Object []> retrievPath11( @Param("id") Long id,
									@Param("MatchId") User MatchId,
								  @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	@Query(	  " SELECT r1.source, r2.target"
	+ " FROM User u1 JOIN u1.imRelationshipOf r1, User u2 JOIN u2.imRelationshipOf r2, User u3 JOIN u3.imRelationshipOf r3 "
	+ " WHERE "
	+ "		  r3.target NOT IN :firstCircleFriends AND "
	+ "		  u1.id=:id AND"
	+ "       r1.type Like 'F' AND"
	+ "       r2.type Like 'F' AND"
	+ "       r3.type Like 'F' AND"
	+ "       u2.id<>:id AND"
	+ "       u3.id<>:id AND"
	+ "       r1.source = r2.source AND"
	+ "       r2.target = r3.source AND"
	+ "       r3.target = :MatchId")
	Set<Object []> retrievPath12( @Param("id") Long id,
								  @Param("MatchId") User MatchId,
								  @Param("firstCircleFriends") Set<User> firstCircleFriends);
	
	public Set<Object []> getAllPathes(long id,User match);
	
}
