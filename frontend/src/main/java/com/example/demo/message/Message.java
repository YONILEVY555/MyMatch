package com.example.demo.message;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.example.demo.user.User;


@Entity
@IdClass(MessageId.class)
public class Message {
	
	@Id
	@ManyToOne
	@JoinColumn(name="source", referencedColumnName = "id")
	private User source;
	
	@Id
	@ManyToOne
	@JoinColumn(name="target", referencedColumnName = "id")
	private User target;
	
	@Id
	private LocalDate date;
	
	@Id
	private Long hour;
	
	@Id
	private Long minute;
	
	@Id
	private Long second;
	
	public Message() {
		super();
	}

	public Message(User source, User target, LocalDate date, Long hour, Long minute, Long second) {
		super();
		this.source = source;
		this.target = target;
		this.date = date;
		this.hour = hour;
		this.minute = minute;
		this.second = second;
	}

	public User getSource() {
		return source;
	}

	public void setSource(User source) {
		this.source = source;
	}

	public User getTarget() {
		return target;
	}

	public void setTarget(User target) {
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
	
}
