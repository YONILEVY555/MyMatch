package com.example.demo.validatehelpers;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public final class ValidateHelpers {
	
	private static final Pattern VALID_EMAIL_ADDRESS_REGEX = 
		    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
	
	private static final Pattern VALID_PHONENUMBER_REGEX = 
		    Pattern.compile("^[0-9]{3}[0-9]{3}[0-9]{4}$", Pattern.CASE_INSENSITIVE);

		public static boolean emailValidate(String email) {
		        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(email);
		        return matcher.find();
		}
		
		public static boolean phoneNumberValidate(String phone) {
	        Matcher matcher = VALID_PHONENUMBER_REGEX.matcher(phone);
	        return matcher.find();
		}

}
