package com.example.demo.preferences;

public enum Gender {
	
    MALE("M"), FEMALE("F"), UNDEFINED("U");

    private String code;

    private Gender(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
    
}

