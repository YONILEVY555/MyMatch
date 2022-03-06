package com.example.demo.datehelpers;

import java.time.LocalDate;
import java.time.Period;
import java.util.Date;

public final class DateHelpers {
	
    public static int calculateAge(LocalDate birthDate, LocalDate currentDate) {
        if ((birthDate != null) && (currentDate != null)) {
            return Period.between(birthDate, currentDate).getYears();
        } else {
            return 0;
        }
    }
	   
}
