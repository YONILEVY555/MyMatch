package com.example.demo.message;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.example.demo.relationship.RelationshipId;

public class MessageId implements Serializable {
	
	private Long source;
	private Long target;
	private LocalDate date;
	private Long hour;
	private Long minute;
	private Long second;
	
	public Long getSource() {
		return source;
	}
	
	public void setSource(Long source) {
		this.source = source;
	}
	
	public Long getTarget() {
		return target;
	}
	
	public void setTarget(Long target) {
		this.target = target;
	}
	public LocalDate getDate() {
		return date;
	}
	
	public void setDate(LocalDate date) {
		this.date = date;
	}
	
	public Long getHour() {
		return hour;
	}
	
	public void setHour(Long hour) {
		this.hour = hour;
	}
	
	public Long getMinute() {
		return minute;
	}
	
	public void setMinute(Long minute) {
		this.minute = minute;
	}
	
	public Long getSecond() {
		return second;
	}
	
	public void setSecond(Long second) {
		this.second = second;
	}
	
	@Override
	public int hashCode() {
		return Objects.hash(date, hour, minute, second, source, target);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MessageId other = (MessageId) obj;
		return Objects.equals(date, other.date) && Objects.equals(hour, other.hour)
				&& Objects.equals(minute, other.minute) && Objects.equals(second, other.second)
				&& Objects.equals(source, other.source) && Objects.equals(target, other.target);
	}
	
}
