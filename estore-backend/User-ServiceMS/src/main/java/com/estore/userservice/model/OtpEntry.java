package com.estore.userservice.model;

import jakarta.persistence.Entity;

public class OtpEntry {
	private String otp;
	private long timestamp;
	
	public OtpEntry(String otp, long timestamp) {
		this.otp = otp;
		this.timestamp = timestamp;
	}
	
	public String getOtp() {
		return otp;
	}
	
	public long getTimestamp() {
		return timestamp;
	}
}
