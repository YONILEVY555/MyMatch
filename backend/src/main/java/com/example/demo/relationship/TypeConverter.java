package com.example.demo.relationship;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class TypeConverter implements AttributeConverter<Type, String> {

	  @Override
	    public String convertToDatabaseColumn(Type category) {
	        if (category == null) {
	            return null;
	        }
	        return category.getCode();
	    }

	    @Override
	    public Type convertToEntityAttribute(String code) {
	        if (code == null) {
	            return null;
	        }

	        return Stream.of(Type.values())
	          .filter(c -> c.getCode().equals(code))
	          .findFirst()
	          .orElseThrow(IllegalArgumentException::new);
	    }
	
}
