package com.example.demo.relationship;

import java.util.Set;

public interface RelationshipJpaRepositoryCustom {

	public Relationship retrievRelationshipByIdAndOtherIdAndType(Long id,Long otherId, String type);
	public void updateRelationship(Long source,Long target,Type type,Status status);
	public void insertRelationship(Long userId,Long otherId,Type type,Status status);
	public Set<Relationship> retrievAllRelationshipByTypeAndStatus(long id,String type, String status);
}
