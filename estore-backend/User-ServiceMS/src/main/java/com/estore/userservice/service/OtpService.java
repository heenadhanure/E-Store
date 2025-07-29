package com.estore.userservice.service;

import java.time.Instant;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.estore.userservice.model.OtpEntry;

@Service
public class OtpService {
	@Autowired
	private EmailService emailService;
	
	private static final long OTP_VALIDITY_MILLIS = 5 * 60 * 1000; // 5 minutes
	private Map<String, OtpEntry> otpMap = new ConcurrentHashMap<>();
	
	public void generateOtp(String target) {
		String otp = String.valueOf(new Random().nextInt(899999) + 100000); // 6-digits
		long timestamp = Instant.now().toEpochMilli();
		
		otpMap.put(target,  new OtpEntry(otp, timestamp));
		
//		System.out.println("OTP for "+target+" is : "+otp);
		emailService.sendOtpEmail(target, otp); // only if it's an email

	}
	
	public boolean verifyOtp(String target, String otp) {
		OtpEntry entry = otpMap.get(target);
		
		if(entry == null )return false;
		
        long now = Instant.now().toEpochMilli();
		if (!entry.getOtp().equals(otp)) return false;

        if (now - entry.getTimestamp() > OTP_VALIDITY_MILLIS) {
            otpMap.remove(target);
            return false; // expired
        }

        otpMap.remove(target); // OTP can be used only once
        return true;
	}
}
