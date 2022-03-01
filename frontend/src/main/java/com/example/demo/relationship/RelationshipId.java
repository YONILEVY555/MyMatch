package com.example.demo.relationship;

import java.io.Serializable;
import java.util.Objects;

public class RelationshipId implements Serializable {
	
	private Long source;
	private Long target;
	
	public Long getSource() {
		return source;
	}
	
	public void setSource(Long source) {
		this.source = source;
	}
	
	public Long getTarget() {
		return target;
	}
	
	public void setTarget(Long target) {
		this.target = target;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(source, target);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		RelationshipId other = (RelationshipId) obj;
		return Objects.equals(source, other.source) && Objects.equals(target, other.target);
	}
	
}
