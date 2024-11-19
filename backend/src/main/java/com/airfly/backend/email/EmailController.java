package com.airfly.backend.email;

import jakarta.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.nio.charset.StandardCharsets;

@RestController
public class EmailController {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailController(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @PostMapping("/send-email")
    public String sendEmail(@RequestBody EmailData emailData) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, StandardCharsets.UTF_8.name());
            helper.setFrom("airfly.bookyourtickets@gmail.com");
            helper.setTo(emailData.getEmail());
            helper.setSubject("Ihre AirFly Buchung");
            helper.setText(emailData.getHtmlContent(), true);

            mailSender.send(message);
            return "Email sent successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error sending email: " + e.getMessage();
        }
    }
}