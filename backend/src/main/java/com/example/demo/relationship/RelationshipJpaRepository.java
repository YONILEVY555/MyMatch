package com.example.demo.relationship;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.user.User;

public interface RelationshipJpaRepository extends JpaRepository<Relationship, Long> {

	@Modifying
	@Query("delete from Relationship r where r.source=:id_1 and r.target=:id_2")
	void deleteById(@Param("id_1") Long id_1,@Param("id_2") Long id_2);
	
	@Query("select r from User u JOIN u.imRelationshipOf r where u.id=:id and cast(r.type as text) =:type and r.source.id =:otherId ")
    	Relationship retrievImRelationshipByIdAndOtherIdAndType(@Param("id") Long id, @Param("otherId") Long otherId, @Param("type") String type);
 
    @Query("select r from User u JOIN u.myRelationship r where u.id=:id and cast(r.type as text) =:type and r.target.id =:otherId ")
    	Relationship retrievMyRelationshipByIdAndOtherIdAndType(@Param("id") Long id, @Param("otherId") Long otherId, @Param("type") String type);
    
	@Query("select r from User u JOIN u.myRelationship r where u.id=:id and cast(r.type as text) =:type and cast(r.status as text) =:status")
		Set<Relationship> retrievMyRelationshipByTypeAndStatus(@Param("id") Long id, @Param("type") String type, @Param("status") String status);
	
	@Query("select r from User u JOIN u.imRelationshipOf r where u.id=:id and cast(r.type as text) =:type and cast(r.status as text) =:status")
		Set<Relationship> retrievImRelationshipByTypeAndStatus(@Param("id") Long id, @Param("type") String type, @Param("status") String status);
	
    public Relationship retrievRelationshipByIdAndOtherIdAndType(Long id,Long otherId, String type);
    
	public Relationship findBySourceAndTarget(User source, User target);
	
	public void updateRelationship(Long source,Long target,Type type,Status status);
	
	public void insertRelationship(Long userId,Long otherId,Type type,Status status);
	
	public Set<Relationship> retrievAllRelationshipByTypeAndStatus(long id,String type, String status);


}
