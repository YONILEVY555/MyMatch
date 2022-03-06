package com.example.demo.preferences;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.example.demo.datehelpers.DateHelpers;
import com.example.demo.user.User;

@Entity
@Table(name = "PREFERENCE")
public class Preferences{
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private int maxDistace;
	private int maxAge;
	private Gender gender;
	
	@OneToOne//(cascade = CascadeType.ALL)
	@MapsId
	@JoinColumn(name = "user_id")
	private User user;
	
	public Preferences() {
		super();
	}
	
	public Preferences(User user) {
		
		Gender gender = user.getGender();
		
		switch(gender) {
		  case FEMALE:
			 this.gender = Gender.MALE;
		    break;
		  case MALE:
			  this.gender = Gender.FEMALE;
		    break;
		  default:
			  this.gender = Gender.UNDEFINED;
		}
		
		this.maxAge = DateHelpers.calculateAge(user.getDate(),LocalDate.now());
		
		maxDistace = 20;
				
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	public int getMaxDistace() {
		return maxDistace;
	}
	public void setMaxDistace(int maxDistace) {
		this.maxDistace = maxDistace;
	}
	public int getMaxAge() {
		return maxAge;
	}
	public void setMaxAge(int maxAge) {
		this.maxAge = maxAge;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(gender, maxAge, maxDistace, user, id);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Preferences other = (Preferences) obj;
		return gender == other.gender && maxAge == other.maxAge && maxDistace == other.maxDistace
				&& Objects.equals(user, other.user) && Objects.equals(id, other.id);
	}
	
	
	
}

	

