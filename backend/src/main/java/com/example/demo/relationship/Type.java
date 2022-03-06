package com.example.demo.relationship;

public enum Type {

    MATCH("M"), FRIEND("F"), BLOCK("B");

    private String code;

    private Type(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
    
    public static Type findByName(String name) {
    	Type result = null;
        for (Type direction : values()) {
            if (direction.name().equalsIgnoreCase(name)) {
                result = direction;
                break;
            }
        }
        return result;
    }
	
}
