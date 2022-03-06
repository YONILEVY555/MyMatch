package com.example.demo.preferences;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;

import com.example.demo.user.User;
import com.example.demo.user.UserJpaRepository;
import com.example.demo.user.UserJpaRepositoryCustom;

public class PreferencesJpaRepositoryImpl implements PreferencesJpaRepositoryCustom{

	@Autowired
	private UserJpaRepository userJpaRepository;
	
	@Autowired
    @Lazy
	PreferencesJpaRepository preferencesJpaRepository;
	
	public void insertPreferences(long id){	
	    
		User user = userJpaRepository.findById(id).get();	
		Preferences preferences = new Preferences(user);
		preferences.setUser(user);
		preferencesJpaRepository.save(preferences);
		user.setPreferences(preferences);
		userJpaRepository.save(user);
		
	}
	
	public void updatePreferences(long id,int age, int distance, Gender gender){	
	    
		User user = userJpaRepository.findById(id).get();
		
		Preferences preferences = preferencesJpaRepository.findByUser(user);
		
		preferences.setMaxAge(age);
		preferences.setMaxDistace(distance);
		preferences.setGender(gender);
		
		preferencesJpaRepository.save(preferences);
				
	}
	
}
