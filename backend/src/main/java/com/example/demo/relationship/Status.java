package com.example.demo.relationship;

public enum Status {

    ACTIVE("A"), STANDBY("S");

    private String code;

    private Status(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
