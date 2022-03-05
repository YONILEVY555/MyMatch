package com.example.demo.preferences;

public interface PreferencesJpaRepositoryCustom {
	
	public void insertPreferences(long id);
	public void updatePreferences(long id,int age, int distance, Gender gender);
}
