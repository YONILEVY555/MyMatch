package com.example.demo.relationship;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import com.example.demo.user.User;


@Entity
@IdClass(RelationshipId.class)
public class Relationship {

	@Id
	@ManyToOne
	@JoinColumn(name="source", referencedColumnName = "id")
	private User source;
	
	@Id
	@ManyToOne
	@JoinColumn(name="target", referencedColumnName = "id")
	private User target;

	@Column(name="type")
	private Type type;
	
	@Column(name="status")
	private Status status;
	
	public Relationship() {
		super();
	}

	public Relationship(User source, User target, Type type, Status status) {
		super();
		this.source = source;
		this.target = target;
		this.type = type;
		this.status = status;
	}

	public User getSource() {
		return source;
	}

	public void setSource(User source) {
		this.source = source;
	}

	public User getTarget() {
		return target;
	}

	public void setTarget(User target) {
		this.target = target;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}
	
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}
	
}
