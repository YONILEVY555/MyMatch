package com.example.demo.preferences;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.user.User;
import com.example.demo.user.UserJpaRepositoryCustom;

@Repository
public interface PreferencesJpaRepository extends JpaRepository<Preferences, Long>{
	
	public void insertPreferences(long id);
	public void updatePreferences(long id,int age, int distance, Gender gender);
	public Preferences findByUser(User user);

}
