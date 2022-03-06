package com.example.demo.user;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PreRemove;
import javax.persistence.PrimaryKeyJoinColumn;

import org.hibernate.annotations.Cascade;

import com.example.demo.image.Image;
import com.example.demo.message.Message;
import com.example.demo.preferences.Gender;
import com.example.demo.preferences.Preferences;
import com.example.demo.relationship.Relationship;
import com.fasterxml.jackson.annotation.JsonIgnore;


@EntityListeners(AuditTrailListener.class)
@Entity
public class User  {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(name = "username", nullable = false)
	private String username;
	
	@Column(name = "gender", nullable = false)
    private Gender gender;
	
	@Column(name = "date", nullable = true)
    private LocalDate date;
	
	@Column(name = "phone", nullable = false)
    private String phone;   
	
	@Column(name = "email", nullable = false)
    private String email;
	
	@Column(name = "description", nullable = true)
    private String description;
	
	@Column(name = "hashpassword", nullable = false)
    private String hashpassword;
	
	@JsonIgnore
	@OneToMany(mappedBy = "source",cascade = {CascadeType.ALL})//cascade = {CascadeType.ALL}
	private Set<Relationship> myRelationship  = new HashSet<Relationship>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "target",cascade = {CascadeType.ALL})
	private Set<Relationship> imRelationshipOf  = new HashSet<Relationship>();
	
	@JsonIgnore
    @OneToMany(mappedBy="user", cascade = {CascadeType.ALL})
    private Set<Image> images = new HashSet<Image>();
	
	@JsonIgnore
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@PrimaryKeyJoinColumn
    private Preferences preferences; 
	
	@JsonIgnore
	@OneToMany(mappedBy = "source",cascade = {CascadeType.ALL})
	private Set<Message> myMessage  = new HashSet<Message>();
	
	@JsonIgnore
	@OneToMany(mappedBy = "target",cascade = {CascadeType.ALL})
	private Set<Message> imMessageOf  = new HashSet<Message>();
    
	protected User() {
		
	} 
	
	public User(Long id, String username, Gender gender,LocalDate date, String phone, String email, String description,String hashpassword ) {
		super();
		this.id = id;
		this.username = username;
		this.gender = gender;
		this.date = date;
		this.phone = phone;
		this.email = email;
		this.description = description;
		this.hashpassword = hashpassword;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public Gender getGender() {
		return gender;
	}



	public void setGender(Gender gender) {
		this.gender = gender;
	}



	public LocalDate getDate() {
		return date;
	}



	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getPhone() {
		return phone;
	}



	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getHashpassword() {
		return hashpassword;
	}


	public void setHashpassword(String hashpassword) {
		this.hashpassword = hashpassword;
	}

	public Set<Relationship> getMyRelationship() {
		return myRelationship;
	}
	
	public void addMyRelationship(Relationship relationship) {
		this.myRelationship.add(relationship);
	}
	
	public Set<Relationship> getImRelationshipOf() {
		return imRelationshipOf;
	}

	public void addRelationshipOf(Relationship relationship) {
		this.imRelationshipOf.add(relationship);
	}
	
	public Set<Image> getImage() {
		return images;
	}

	public void addImage(Image image) {
		this.images.add(image);
	}
	
	public Preferences getPreferences() {
		return preferences;
	}

	public void setPreferences(Preferences preferences) {		
		this.preferences = preferences;
	}
	
	public Set<Message> getMyMessage() {
		return myMessage;
	}
	
	public void addMyMessage(Message message) {
		this.myMessage.add(message);
	}
	
	public Set<Message> getImMessageOf() {
		return imMessageOf;
	}

	public void addMessageOf(Message message) {
		this.imMessageOf.add(message);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return id == other.id;
	}
	
}
