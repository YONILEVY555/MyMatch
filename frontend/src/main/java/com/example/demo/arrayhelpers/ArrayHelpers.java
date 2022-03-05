package com.example.demo.arrayhelpers;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.example.demo.datehelpers.DateHelpers;
import com.example.demo.preferences.Gender;
import com.example.demo.preferences.Preferences;
import com.example.demo.user.User;
import com.example.demo.user.UserJpaRepositoryImpl;

public final class ArrayHelpers {

    public static <T> Set<T> mergeSet(Set<T> a, Set<T> b)
    {

        Set<T> mergedSet = new HashSet<T>();

        mergedSet.addAll(a);
        mergedSet.addAll(b);

        return mergedSet;
    }
    
    public static Set<User> filterByAgeAndGender(Set<User> arr ,int age ,int distance, Gender gender)
    {
    	
    	Logger logger = Logger.getLogger(ArrayHelpers.class.getName()); 
    	
		logger.log(Level.INFO, "myCheck: {0}", new Object[] {arr.iterator().next().getGender().equals(gender)});
		logger.log(Level.INFO, "myCheck2: {0}", new Object[] {gender});
		
    	arr.removeIf(p -> (  (DateHelpers.calculateAge(p.getDate(),LocalDate.now()) > age)  || (!p.getGender().equals(gender))) ); 
		 
		logger.log(Level.INFO, "myArr: {0}", new Object[] {arr});

        return arr;
        
    }
	
}
