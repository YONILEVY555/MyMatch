package com.example.demo.preferences;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class GenderConverter implements AttributeConverter<Gender, String> {
	
	  @Override
	    public String convertToDatabaseColumn(Gender category) {
	        if (category == null) {
	            return null;
	        }
	        return category.getCode();
	    }
         
	    @Override
	    public Gender convertToEntityAttribute(String code) {
	        if (code == null) {
	            return null;
	        }

	        return Stream.of(Gender.values())
	          .filter(c -> c.getCode().equals(code))
	          .findFirst()
	          .orElseThrow(IllegalArgumentException::new);
	    }

}

